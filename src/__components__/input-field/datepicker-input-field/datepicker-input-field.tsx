import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-input-field.css";
import React, { forwardRef, useEffect, useState } from "react";
import Datepicker from "react-datepicker";
import stringToDate from "home/__helpers/date/string-to-date";
import dateToString from "home/__helpers/date/date-to-string";

function useHighlightDates(highlightDays: string[] = []): [Date[]] {
    const [highlightDates, setHighlightDates] = useState<Date[]>([])

    useEffect(() => {
        setHighlightDates(highlightDays.map(stringToDate));
    }, [highlightDays]);

    return [highlightDates];
}

interface DatepickerInputProps {
    value: string;
    onSelect: (nd: string) => any;
    highlightDays: string[];
}
export default function DatepickerInput({ value, highlightDays, onSelect }: DatepickerInputProps) {
    const [dateValue, setDateValue] = useState(stringToDate(value));
    const [highlightDates] = useHighlightDates(highlightDays);
    const [presentationDate, setPresentationDate] = useState('');

    useEffect(() => {
        if (value !== presentationDate) {
            setDateValue(stringToDate(value));
        }
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        setPresentationDate(dateToString(dateValue));
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
