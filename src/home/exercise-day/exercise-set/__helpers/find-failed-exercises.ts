import { Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";

function exerciseFailedForSet(series: number[], rep_goal: number, series_goal: number) {
    return series.find(s => s !== rep_goal) || (series.length < series_goal)
}

export default function findFailedExercises(day: ExerciseDay): Exercises[] {
    return (Object.keys(day.exercises) as Exercises[]).filter(exercise => {
        const { series, series_goal } = day.exercises[exercise]!
        return exerciseFailedForSet(series, day.rep_goal, series_goal);
    });
}
