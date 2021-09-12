import { Dispatch, useEffect, useState } from "react";
import bannerConfirm from "__components__/confirm-banner/confirm-banner";
import { register as serviceWorkerRegister } from 'serviceWorkerRegistration';

type UpdaterFunction = () => Promise<void>;

export default function useServiceWorker(): [UpdaterFunction | undefined, Dispatch<UpdaterFunction | undefined>] {
    const [triggerUpdate, setTriggerUpdate] = useState<UpdaterFunction | undefined>();

    async function updateVersion(registration: ServiceWorkerRegistration) {
        const confirm = await bannerConfirm('Update now?');
        if (confirm) { // 'SKIP_WAIT' is what serviceWorker expects
            registration.waiting?.postMessage({ type: 'SKIP_WAIT' });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            navigator.serviceWorker.getRegistration().then(r => r?.update());
        }, 30000);

        serviceWorkerRegister({
            onUpdate: (registration) => {
                // we return a method that when called would prompt to update service worker;
                function updateTrigger() {
                    return ()=>updateVersion(registration)
                };
                setTriggerUpdate(updateTrigger);
            }
        });

        return () => clearInterval(interval);
    }, []);

    return [triggerUpdate, setTriggerUpdate];
}
