import { Exercises } from "home/blocks/block/block.model";

export interface SeriesExerciseDaySet {
    value?: number;
    serieKey: string;
    maxValue: number;
}

export interface ExerciseDaySet {
    key: string;
    title: string;
    exercise: Exercises;
    repsAndSeries: string;
    weight: number;
    modifier: number;
    seriesArray: SeriesExerciseDaySet[];
}
