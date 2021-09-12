import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-input-field.css";
import React, { forwardRef, useEffect, useState } from "react";
import Datepicker from "react-datepicker";

function useHighlightDates(highlightDays: string[] = []): [Date[]] {
    const [highlightDates, setHighlightDates] = useState<Date[]>([])

    useEffect(() => {
        setHighlightDates(highlightDays.map(stringToDate));
    }, [highlightDays]);

    return [highlightDates];
}

function stringToDate(string: string): Date {
    const [day, month, year] = string.split('-');
    return new Date(+year, +month - 1, +day);
}

interface DatepickerInputProps {
    value: string;
    onSelect: (nd: string) => any;
    highlightDays: string[];
}
export default function DatepickerInput({ value, highlightDays, onSelect }: DatepickerInputProps) {
    const [dateValue, setDateValue] = useState(new Date(value));
    const [highlightDates] = useHighlightDates(highlightDays);
    const [presentationDate, setPresentationDate] = useState('');

    useEffect(() => {
        if (value !== presentationDate) {
            setDateValue(stringToDate(value));
        }
        // eslint-disable-next-line
    }, [value]);

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
            highlightDates={highlightDates}
            withPortal
        />);
}
