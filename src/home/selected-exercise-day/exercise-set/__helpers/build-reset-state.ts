import { ExerciseBlock } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseSetState } from "../__models/exercise-set-state";
import buildExerciseSet from "./build-exercise-set";
import buildInitialState from "./build-initial-state";

export default function buildResetState(day: ExerciseDay, block: ExerciseBlock): ExerciseSetState {
    const dayExerciseBody = buildExerciseSet(day, block);
    return buildInitialState(dayExerciseBody);
}
