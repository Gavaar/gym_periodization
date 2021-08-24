import { Exercises } from "home/blocks/block/block.model";
import { ExerciseDay, NewDay } from "../day/day.model";

function repGoalForWeek(week: number): number {
    switch(week) {
        case 4:
            return 3;
        case 3:
            return 4;
        case 2:
            return 5;
        case 1:
            return 6;
        default:
            return 6;
    }
}
export default function buildNewDay({ previousDay, week }: { previousDay?: ExerciseDay; week: number }): NewDay {
    const exercises = ((): [Exercises, Exercises, Exercises] => {
        if (previousDay?.exercises.deadlift) {
            return ['squat', 'bench_press', 'barbell_row'];
        }
        return ['squat', 'overhead_press', 'deadlift'];
    })();

    const seriesGoal = exercises.reduce((goal, ex) => {
        goal[ex] = ex === 'deadlift' ? 1 : 5;
        return goal;
    }, {} as { [exercise in Exercises]: number });

    return new NewDay({
        exercises,
        seriesGoal,
        repGoal: repGoalForWeek(week),
    });
}
