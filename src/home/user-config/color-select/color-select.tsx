import './color-select.css';
import { COLORS } from './color-select.config';

const colors = Object.keys(COLORS);

export default function ColorSelect({ color, onColorSelect }: { color: string, onColorSelect: (color: string) => any}): JSX.Element {
    return (
        <div className="ColorSelect">
            <span className="ColorSelect__title">App color</span>
            <div className="ColorSelect__opts">
                {colors.map(col => {
                    const hexColor = COLORS[col];
                    const appendClass = hexColor === color ? ' selected' : ' ';

                    return (<div
                        key={col}
                        className={'ColorSelect__btn ' + col + appendClass}
                        onClick={() => onColorSelect(hexColor)}>
                    </div>);
                })}
            </div>
        </div>);
}
