import './user-config.css';
import { useState } from "react";
import { COLORS } from './user-config.config';
import useColor from './user-config.state';

export default function UserConfig() {
    const [openClose, setOpenClose] = useState(false);
    const [selectedColor, setSelectedColor] = useColor();

    const colors = Object.keys(COLORS);
    
    return (
        <div className="UserConfig">
            <div className="UserConfig__icon" onClick={() => setOpenClose(!openClose)}>⚙</div>
            {openClose &&
                <ul className="UserConfig__list">
                    <span>App color</span>
                    <div className="UserConfig__color-options">
                        {colors.map(col => {
                            const hexColor = COLORS[col];
                            const appendClass = hexColor === selectedColor ? ' selected' : ' ';

                            return (<div
                                key={col}
                                className={'UserConfig__btn ' + col + appendClass}
                                onClick={() => setSelectedColor(hexColor)}>
                            </div>);
                        })}
                    </div>
                </ul>}
        </div>
    );
}
