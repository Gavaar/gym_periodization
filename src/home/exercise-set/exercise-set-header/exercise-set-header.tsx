import './exercise-set-header.css';
import { DaysProvider } from "home/days/days.context";
import { useContext } from "react";
import DatepickerInput from "__components__/input-field/datepicker-input-field/datepicker-input-field";
import copyOfDayWithState from "../__helpers/copy-day-with-state";
import { ExerciseSetState } from "../__models/exercise-set-state";
import { useDayDates } from "./exercise-set-header.state";
import { DayProvider } from 'home/days/day/day.context';

export default function ExerciseSetHeader({ dayBodyState }: { dayBodyState: [ExerciseSetState] }) {
    const [days] = useContext(DaysProvider);
    const [day, setDay] = useContext(DayProvider);
    const [dayBody] = dayBodyState;
    const [dayDates] = useDayDates(days);

    const onChangeDate = (newDate: string) => {
        const newDay = copyOfDayWithState(day, dayBody);
        setDay({ ...newDay, date: newDate });
    }

    return (<h3 className="ExerciseSetHeader">
        <span>{(day.id !== -1) ? `Ex. ${`${day.id}`.substring(0, 5)}` : 'New Exercise'}</span>
        <span>Rep goal: {day.rep_goal}</span>
        <DatepickerInput value={day.date} onSelect={onChangeDate} highlightDays={dayDates} />
    </h3>);
}
