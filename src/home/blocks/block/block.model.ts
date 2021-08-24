export type Exercises = 'squat' | 'bench_press' | 'overhead_press' | 'barbell_row' | 'deadlift';
export type ExerciseConfiguration = {
    [exercise in Exercises]: {
        medium_weight: number;
        modifier: number;
        failed_day_ids: number[];
    }
}

export interface ExerciseBlock {
    id: number;
    day_ids: number[];
    exercise_configuration: ExerciseConfiguration;
}

export class NewExerciseBlock implements ExerciseBlock {
    id = -1;
    day_ids = [];
    exercise_configuration: ExerciseConfiguration;
    
    constructor(previousExerciseConfiguration: ExerciseConfiguration) {
        this.exercise_configuration = (Object.keys(previousExerciseConfiguration) as Exercises[])
            .reduce((newExerciseConfig, exerciseName: Exercises) => {
                const { medium_weight, failed_day_ids, modifier } = previousExerciseConfiguration[exerciseName];
                newExerciseConfig[exerciseName] = {
                    modifier,
                    medium_weight: failed_day_ids.length ? medium_weight : medium_weight + modifier,
                    failed_day_ids: [],
                }
                return newExerciseConfig;
            }, {} as ExerciseConfiguration);
    }
}
