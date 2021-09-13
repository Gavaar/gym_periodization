import { Exercises } from "home/blocks/block/block.model";
import dateToString from "home/__helpers/date/date-to-string";

export interface ExerciseDay {
    id: number;
    date: string,
    rep_goal: number,
    exercises: {
        [exercise in Exercises]?: {
            series_goal: number;
            series: number[];
        }
    }
}

export const exerciseShortName: { [exer in Exercises]: string } = {
    squat: 'SQ',
    overhead_press: 'OHP',
    barbell_row: 'BR',
    bench_press: 'BP',
    deadlift: 'DL'
};

function buildNewDate() {
    const newDate = new Date();
    return dateToString(newDate);
}

interface NewDayConfig {
    repGoal: number;
    seriesGoal: { [exercise in Exercises]: number };
    exercises: [Exercises, Exercises, Exercises];
}
export class NewDay implements ExerciseDay {
    id = -1;
    date = buildNewDate();
    rep_goal: number;
    exercises: { [exercise in Exercises]: { series_goal: number; series: number[]; } };

    constructor(newDayConfig: NewDayConfig) {
        const { exercises, repGoal, seriesGoal } = newDayConfig;
        this.rep_goal = repGoal;
        this.exercises = exercises.reduce((config, exercise) => {
            config[exercise] = {
                series: [],
                series_goal: seriesGoal[exercise],
            };
            return config;
        }, {} as NewDay['exercises'])
    }
}
