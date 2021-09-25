import { Exercises } from "home/blocks/block/block.model";
import { Dispatch, useEffect, useState } from "react";
import { ExerciseDaySet } from "../../__models/exercise-day-set";

export type VolumeState = { [key in Exercises]?: number } & { total?: number};
export function useVolume(daySetState: { [ex: string]: number | undefined }, dayExerciseBody: ExerciseDaySet[]): [VolumeState, Dispatch<VolumeState>] {
    const [volume, setVolume] = useState<VolumeState>({});

    useEffect(() => {
        const repsByExercise = Object.keys(daySetState).reduce((reps, key) => {
                const ex = key.split('::')[0] as Exercises;
                reps[ex] = (reps[ex] || 0) + (daySetState[key] || 0);
                return reps;
            }, {} as { [e in Exercises]: number });

        const newVolume = dayExerciseBody.reduce((vol, { exercise, weight }) => {
            const addedValue = (repsByExercise[exercise] || 0) * weight;
            vol[exercise] = (vol[exercise] || 0) + addedValue;
            vol.total = (vol.total || 0) + addedValue;
            return vol;
        }, {} as VolumeState);

        setVolume(newVolume);
    }, [daySetState, dayExerciseBody]);

    return [volume, setVolume];
}
