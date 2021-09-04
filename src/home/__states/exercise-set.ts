import { ExerciseBlock } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseDaySet } from "home/selected-exercise-day/exercise-set/__models/exercise-day-set";
import { useEffect, useState } from "react";
import buildExerciseSet from "../selected-exercise-day/exercise-set/__helpers/build-exercise-set";
import buildInitialState from "../selected-exercise-day/exercise-set/__helpers/build-initial-state";

export function useSetDay(day: ExerciseDay, block: ExerciseBlock) {
    const [daySetState, setDayBody] = useState<{ [exKey: string]: number | undefined }>({});
    const [dayExerciseBody, setDayExerciseBody] = useState<ExerciseDaySet[]>([]);

    useEffect(() => {
        setDayExerciseBody(buildExerciseSet(day, block));
    }, [day, block]);

    useEffect(() => {
        const resetState = buildInitialState(dayExerciseBody);
        setDayBody(resetState);
    }, [dayExerciseBody]);

    return { daySetState, dayExerciseBody, setDayBody };
}
