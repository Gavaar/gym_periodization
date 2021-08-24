import { ExerciseDay } from "home/days/day/day.model";
import { Dispatch, useEffect, useState } from "react";

export default function useDay(day: ExerciseDay): [ExerciseDay, Dispatch<ExerciseDay>] {
    const [dayData, setDayData] = useState(day);

    useEffect(() => {
        setDayData(day);
    }, [day]);

    return [dayData, setDayData];
}
