import './ladder-input-field.css';
import { Dispatch, useEffect, useState } from "react";

function useLadderInput(initValue: number) {
    const [value, setValue] = useState<number>();
    useEffect(() => {
        setValue(initValue);
    }, [initValue]);
    return [value, setValue] as [number, Dispatch<number>];
}

interface LadderInputProps {
    value: number;
    modifier: number;
    onChange?: (newValue: number) => any;
}
export default function LadderInput({ value, modifier, onChange = () => {} }: LadderInputProps): JSX.Element {
    const [ladderValue, setLadderValue] = useLadderInput(value);

    function handleAdd() {
        setLadderValue(ladderValue + modifier);
        onChange(ladderValue + modifier);
    }

    function handleTake() {
        setLadderValue(ladderValue - modifier);
        onChange(ladderValue - modifier);
    }

    return (
        <div className="LadderInput">
            <span className="LadderInput__handler" onClick={handleTake}>&#8722;</span>
            <span className="LadderInput__value">{ladderValue}</span>
            <span className="LadderInput__handler" onClick={handleAdd}>&#43;</span>
        </div>
    );
}
