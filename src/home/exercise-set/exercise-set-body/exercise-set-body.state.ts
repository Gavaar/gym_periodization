import { Dispatch, useContext, useEffect, useState } from "react";
import buildExerciseSet from "../__helpers/build-exercise-set";
import { ExerciseDaySet } from "../__models/exercise-day-set";
import { DayProvider } from "home/days/day/day.context";
import { BlockProvider } from "home/blocks/block/block.context";

export function useExerciseBody(): [ExerciseDaySet[], Dispatch<ExerciseDaySet[]>] {    
    const [day] = useContext(DayProvider);
    const [block] = useContext(BlockProvider);

    const [dayExerciseBody, setDayExerciseBody] = useState<ExerciseDaySet[]>([]);

    useEffect(() => {
        setDayExerciseBody(buildExerciseSet(day, block));
    }, [day, block]);

    return [dayExerciseBody, setDayExerciseBody];
}
