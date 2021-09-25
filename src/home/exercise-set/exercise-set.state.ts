import { Dispatch, useEffect, useState } from "react";
import buildInitialState from "./__helpers/build-initial-state";
import { ExerciseDaySet } from "./__models/exercise-day-set";
import { ExerciseSetState } from "./__models/exercise-set-state";

export function useDayBody(dayExerciseBody: ExerciseDaySet[]): [ExerciseSetState, Dispatch<ExerciseSetState>] {
    const [dayBody, setDayBody] = useState<{ [exKey: string]: number | undefined }>({});

    useEffect(() => {
        const resetState = buildInitialState(dayExerciseBody);
        setDayBody(resetState);
    }, [dayExerciseBody]);

    return [dayBody, setDayBody];
}
