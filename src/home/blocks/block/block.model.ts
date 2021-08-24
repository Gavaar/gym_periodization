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

const DEFAULT_CONFIG: ExerciseConfiguration = {
    squat: {
        failed_day_ids: [],
        medium_weight: 40,
        modifier: 2.5,
    },
    overhead_press: {
        failed_day_ids: [],
        medium_weight: 20,
        modifier: 2.5,
    },
    barbell_row: {
        failed_day_ids: [],
        medium_weight: 30,
        modifier: 2.5,
    },
    bench_press: {
        failed_day_ids: [],
        medium_weight: 30,
        modifier: 2.5,
    },
    deadlift: {
        failed_day_ids: [],
        medium_weight: 40,
        modifier: 5,
    },
}
export class NewExerciseBlock implements ExerciseBlock {
    id = -1;
    day_ids = [];
    exercise_configuration: ExerciseConfiguration;
    
    constructor(previousExerciseConfiguration?: ExerciseConfiguration) {
        const config = previousExerciseConfiguration || DEFAULT_CONFIG;
        this.exercise_configuration = (Object.keys(config) as Exercises[])
            .reduce((newExerciseConfig, exerciseName: Exercises) => {
                const { medium_weight, failed_day_ids, modifier } = config[exerciseName]!;
                newExerciseConfig[exerciseName] = {
                    modifier,
                    medium_weight: failed_day_ids.length ? medium_weight : medium_weight + modifier,
                    failed_day_ids: [],
                }
                return newExerciseConfig;
            }, {} as ExerciseConfiguration);
    }
}
