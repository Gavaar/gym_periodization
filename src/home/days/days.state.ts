import { FireStore } from "home/__helpers/store/firestore";
import { Dispatch, useEffect, useState } from "react";
import { ExerciseDay } from "../days/day/day.model";
import buildNewDay from "../days/__helpers/build-new-day";

export function weekForDayIndex(index: number) { return Math.floor(index/3); }
export const dayStore = new FireStore<ExerciseDay>('exercises/days');

function addNewDayIFAble(days: ExerciseDay[]): ExerciseDay[] {
    const { length } = days;
    const previousDay = days[length - 1];

    if (length < 12 && (!previousDay || previousDay.id !== -1)) {
        const week = weekForDayIndex(length) + 1;
        const newDay = buildNewDay({ previousDay, week });
        days.push(newDay);
    }
    return days;
}

function getDay(id: number): Promise<ExerciseDay> {
    return dayStore.get(`${id}`) as Promise<ExerciseDay>;
}

export function useDays(ids: number[]): [ExerciseDay[], Dispatch<ExerciseDay[]>] {
    const [days, setDays] = useState<ExerciseDay[]>([]);

    useEffect(() => {
        const days: Promise<ExerciseDay>[] = [];
        ids.forEach(id => {
            days.push(getDay(id));
        });
        Promise.all(days).then(days => {
            setDays(addNewDayIFAble(days));
        });
    }, [ids]);

    return [days, setDays];
}
