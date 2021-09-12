import './service-worker-update.css';

export default function ServiceWorkerUpdate({ onClickUpdate }: { onClickUpdate: () => any }): JSX.Element {
    return <div className="ServiceWorkerUpdate" onClick={onClickUpdate}>
        New version available!
    </div>
}
