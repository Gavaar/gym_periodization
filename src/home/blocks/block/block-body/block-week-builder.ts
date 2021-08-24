import { weekForDayIndex } from "home/__states/days";
import snakeToTitle from "home/__helpers/snake-to-title/snake-to-title";
import { ExerciseBlock, Exercises } from "../block.model";

interface BlockWeekParts {
    exerciseName: string;
    weekSuccess: [boolean?, boolean?, boolean?, boolean?];
    modifier: number;
    weight: number;
    key: Exercises;
}
function blockWeekBuilder(block: ExerciseBlock): BlockWeekParts[] {
    return (Object.keys(block.exercise_configuration) as Exercises[]).map(exercise => {
        const { medium_weight, modifier, failed_day_ids } = block.exercise_configuration[exercise];
        const exerciseName = snakeToTitle(exercise);
        const weekSuccess: [boolean?, boolean?, boolean?, boolean?] = [true, true, true, true];
        weekSuccess.length = weekForDayIndex(block.day_ids.length - 1) + 1 as 1 | 2 | 3 | 4;

        failed_day_ids.forEach(day => {
            const dayPosition = block.day_ids.findIndex(dayId => dayId === day) - 1;
            const failedWeek = weekForDayIndex(dayPosition);
            weekSuccess[failedWeek] = false;
        });

        return {
            exerciseName,
            weekSuccess,
            modifier,
            weight: medium_weight,
            key: exercise,
        }
    });
}
export default blockWeekBuilder;
