import { Exercises } from "home/blocks/block/block.model";

export interface ExerciseDaySet {
    key: string;
    title: string;
    exercise: Exercises;
    repsAndSeries: string;
    weight: string;
    seriesArray: {
        value?: number;
        serieKey: string;
        maxValue: number;
    }[];
}
