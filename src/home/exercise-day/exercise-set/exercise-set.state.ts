import { ExerciseBlock, Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import { Dispatch, useEffect, useState } from "react";
import buildExerciseSet from "./__helpers/build-exercise-set";
import buildInitialState from "./__helpers/build-initial-state";
import { ExerciseDaySet } from "./__models/exercise-day-set";
import { ExerciseSetState } from "./__models/exercise-set-state";

export function useBlock(block: ExerciseBlock): [ExerciseBlock, Dispatch<ExerciseBlock>] {
    const [blockData, setBlockData] = useState(block);

    useEffect(() => {
        setBlockData(block);
    }, [block]);

    return [blockData, setBlockData];
}

export function useDay(day: ExerciseDay): [ExerciseDay, Dispatch<ExerciseDay>] {
    const [dayData, setDayData] = useState(day);

    useEffect(() => {
        setDayData(day);
    }, [day]);

    return [dayData, setDayData];
}

type VolumeState = { [key in Exercises]?: number } & { total?: number};
export function useVolume(daySetState: { [ex: string]: number | undefined }, dayExerciseBody: ExerciseDaySet[]): VolumeState {
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

    return volume;
}

export function useDayDates(days: ExerciseDay[]) {
    const [dayDates, setDayDates] = useState<string[]>([]);
    useEffect(() => {
        setDayDates(days.filter(d => +d.id !== -1).map(d => d.date))
    }, [days])
    return [dayDates];
}

export function useExerciseBody(day: ExerciseDay, block: ExerciseBlock): [ExerciseDaySet[], Dispatch<ExerciseDaySet[]>] {
    const [dayExerciseBody, setDayExerciseBody] = useState<ExerciseDaySet[]>([]);

    useEffect(() => {
        setDayExerciseBody(buildExerciseSet(day, block));
    }, [day, block]);

    return [dayExerciseBody, setDayExerciseBody];
}

export function useDayBody(dayExerciseBody: ExerciseDaySet[]): [ExerciseSetState, Dispatch<ExerciseSetState>] {
    const [dayBody, setDayBody] = useState<{ [exKey: string]: number | undefined }>({});

    useEffect(() => {
        const resetState = buildInitialState(dayExerciseBody);
        setDayBody(resetState);
    }, [dayExerciseBody]);

    return [dayBody, setDayBody];
}
