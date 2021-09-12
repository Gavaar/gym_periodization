import './user-config.css';
import ColorSelect from './color-select/color-select';
import useColor from './color-select/color-select.state';
import useOpenClose from './user-config.state';
import useServiceWorker from './service-worker/service-worker-update.state';
import ServiceWorkerUpdate from './service-worker/service-worker-update';

export default function UserConfig() {
    const [openClose, setOpenClose] = useOpenClose();
    const [color, setColor] = useColor();
    const [updateSW] = useServiceWorker();

    return (
        <div className="UserConfig">
            <div className="UserConfig__icon" onClick={() => setOpenClose(!openClose)}>⚙</div>
            {updateSW && <span className="UserConfig__notification" onClick={() => setOpenClose(!openClose)}>!</span>}
            {openClose &&
                <ul className="UserConfig__list" onClick={(e) => e.stopPropagation()}>
                    <ColorSelect color={color} onColorSelect={setColor} />
                    {updateSW && <ServiceWorkerUpdate onClickUpdate={updateSW} />}
                </ul>}
        </div>
    );
}
