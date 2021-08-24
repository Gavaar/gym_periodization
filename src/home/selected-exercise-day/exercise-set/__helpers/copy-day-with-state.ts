import { Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";

export default function copyOfDayWithState(originalDay: ExerciseDay, stateValues: { [ex: string]: number | undefined } ): ExerciseDay {
    const dayToSave: ExerciseDay = {
        ...originalDay,
        exercises: (Object.keys(originalDay.exercises) as Exercises[]).reduce((sum, ex) => {
            const { series_goal, series } = originalDay.exercises[ex]!;
            const undoneSeries = Array.from(Array(series_goal - series.length));

            sum[ex] = {
                series_goal,
                series: [...series, ...undoneSeries].map((_, i) => stateValues[`${ex}::${originalDay.id}::${i}`]!)
            };
            return sum;
        }, {} as ExerciseDay['exercises']),
    };
    return dayToSave;
}
