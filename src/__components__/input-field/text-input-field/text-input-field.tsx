import './text-input-field.css';
import React, { Dispatch, useEffect, useState } from "react";

function useTextInput(initValue: string) {
    const [inputState, setInputState] = useState('');

    useEffect(() => {
        setInputState(`${initValue}`);
    }, [initValue]);

    return [inputState, setInputState] as [string, Dispatch<string>];
}

interface TextInputProps {
    onBlur: (nv: string) => any;
    inputType?: 'text' | 'number';
    value?: any;
    onChange?: (nv: string) => any;
}
export default function TextInput({ value, onBlur, onChange: onChangeProp, inputType = 'text' }: TextInputProps): JSX.Element {
    const [inputState, setInputState] = useTextInput(value);

    function triggerOnChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const { value: targetValue } = ev.target;
        setInputState(targetValue);
        if (onChangeProp) {
            onChangeProp(targetValue);
        }
    }

    return (
        <input className="TextInput"
            type={inputType}
            onChange={triggerOnChange}
            onBlur={(e) => onBlur(e.target.value)}
            value={inputState}/>
    );
}
