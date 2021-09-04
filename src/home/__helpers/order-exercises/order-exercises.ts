import { Exercises } from "home/blocks/block/block.model";

const orderedExercises: Exercises[] = ['squat', 'overhead_press', 'bench_press', 'barbell_row', 'deadlift'];

export function orderExercisesInObject(config: { [ex in Exercises]?: any }) {
    return orderedExercises.filter(ex => config[ex] != null);
}
