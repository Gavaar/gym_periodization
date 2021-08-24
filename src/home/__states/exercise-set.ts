import { ExerciseBlock } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import { useEffect, useState } from "react";
import buildExerciseSet from "../selected-exercise-day/exercise-set/__helpers/build-exercise-set";
import buildInitialState from "../selected-exercise-day/exercise-set/__helpers/build-initial-state";

export function useSetDay(day: ExerciseDay, block: ExerciseBlock) {
    const [daySetState, setDayBody] = useState<{ [exKey: string]: number | undefined }>({});
    const dayExerciseBody = buildExerciseSet(day, block);

    useEffect(() => {
        const resetState = buildInitialState(dayExerciseBody);
        setDayBody(resetState);
    // eslint-disable-next-line
    }, [day, block]);

    return { daySetState, dayExerciseBody, setDayBody };
}
