import { ExerciseDay } from "home/days/day/day.model";
import { useEffect, useState } from "react";

export function useDayDates(days: ExerciseDay[]) {
    const [dayDates, setDayDates] = useState<string[]>([]);
    useEffect(() => {
        setDayDates(days.filter(d => +d.id !== -1).map(d => d.date))
    }, [days])
    return [dayDates];
}
