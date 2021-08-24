import { ExerciseBlock, Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import snakeToTitle from "home/__helpers/snake-to-title/snake-to-title";
import { ExerciseDaySet } from "../__models/exercise-day-set";
import getDayWeight from "./get-day-weight";

export default function buildExerciseSet(exerciseDay: ExerciseDay, exerciseBlock: ExerciseBlock): ExerciseDaySet[] {
    const { id, rep_goal, exercises } = exerciseDay;

    return (Object.keys(exercises) as Exercises[]).map((exercise: Exercises) => {
        const { series_goal, series } = exercises[exercise]!;
        const { medium_weight, modifier, failed_day_ids } = exerciseBlock.exercise_configuration[exercise];
        const dayWeight = getDayWeight({ dayId: id, medium_weight, modifier, rep_goal, failed_day_ids });
        const undoneArray = Array.from(Array(series_goal - series.length), () => undefined);
        const seriesArray = [...series, ...undoneArray].map((value, i) => {
            return {
                value,
                serieKey: `${exercise}::${id}::${i}`,
                maxValue: rep_goal,
            }
        });

        return {
            exercise,
            seriesArray,
            key: `${exercise}_${id}`,
            title: snakeToTitle(exercise),
            repsAndSeries: `${rep_goal}x${series_goal}`,
            weight: `${dayWeight}Kg`,
        };
    });
}
