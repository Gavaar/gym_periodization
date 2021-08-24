import Store from "home/__helpers/store/store";
import { useEffect, useState } from "react";
import { ExerciseDay } from "../days/day/day.model";
import buildNewDay from "../days/__helpers/build-new-day";

export function weekForDayIndex(index: number) { return Math.floor(index/3); }

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

async function getDays(id: number): Promise<ExerciseDay> {
    const store = new Store<ExerciseDay>('days');
    return new Promise((resolve, reject) => {
        try {
            const day = store.get(id);
            resolve(day)
        } catch (error) {
            reject(error);
        }
    });
}
export function useDays(ids: number[]): ExerciseDay[] {
    const [days, setDay] = useState<ExerciseDay[]>([]);

    useEffect(() => {
        const days: Promise<ExerciseDay>[] = [];
        ids.forEach(id => {
            days.push(getDays(id));
        });
        Promise.all(days).then(days => {
            setDay(addNewDayIFAble(days));
        });
    }, [ids, setDay]);

    return days;
}
