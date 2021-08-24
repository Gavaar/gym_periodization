import { Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";

export default function findFailedExercises(day: ExerciseDay): Exercises[] {
    return (Object.keys(day.exercises) as Exercises[]).filter(exercise => {
        const exerciseFailed = day.exercises[exercise]?.series.find(s => s !== day.rep_goal);
        return exerciseFailed;
    });
}
