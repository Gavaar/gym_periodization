import { ExerciseDaySet } from "../__models/exercise-day-set";
import { ExerciseSetState } from "../__models/exercise-set-state";

export default function buildInitialState(dayExerciseBody: ExerciseDaySet[]): ExerciseSetState {
    return dayExerciseBody.reduce((state, day) => {
        day.seriesArray.forEach(serie => {
            state[serie.serieKey] = serie.value;
        });
        return state;
    }, {} as ExerciseSetState);
}
