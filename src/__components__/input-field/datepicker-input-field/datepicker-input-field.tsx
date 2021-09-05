import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-input-field.css";
import React, { forwardRef, useEffect, useState } from "react";
import Datepicker from "react-datepicker";

interface DatepickerInputProps {
    value: string;
    onSelect: (nd: string) => any;
}
export default function DatepickerInput({ value, onSelect }: DatepickerInputProps) {
    const [dateValue, setDateValue] = useState(new Date(value));
    const [presentationDate, setPresentationDate] = useState('');

    useEffect(() => {
        if (value !== presentationDate) {
            const [day, month, year] = value.split('-');
            setDateValue(new Date(+year, +month - 1, +day));
        }
    }, [value, presentationDate])

    useEffect(() => {
        const day = `0${dateValue.getDate()}`.substr(-2);
        const month = `0${dateValue.getMonth() + 1}`.substr(-2);
        const year = dateValue.getFullYear();
        setPresentationDate(`${day}-${month}-${year}`);
    }, [dateValue, setPresentationDate]);

    useEffect(() => {
        onSelect(presentationDate);
        // eslint-disable-next-line
    }, [presentationDate])

    function handleDateSelect(date: Date) {
        setDateValue(date);
    }

    const CustomDatepickerButton = forwardRef(({ onClick }: { onClick?: React.MouseEventHandler }, ref: React.LegacyRef<HTMLDivElement>) => {
        return <div className="DatepickerInput" ref={ref} onClick={onClick}>
            {presentationDate}
        </div>
    })

    return (
        <Datepicker
            dateFormat="dd-MM-yyyy"
            todayButton="Today"
            selected={dateValue}
            onChange={handleDateSelect}
            customInput={<CustomDatepickerButton />}
            withPortal
        />);
}
