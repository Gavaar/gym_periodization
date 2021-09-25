import './exercise-set-body.css';
import { Exercises } from "home/blocks/block/block.model";
import { Dispatch, useContext } from "react";
import LadderInput from "__components__/input-field/ladder-input-field/ladder-input-field";
import { VolumeState } from "../exercise-set-footer/volume/volume.state";
import RepsTracker from "./reps-tracker/reps-tracker";
import { ExerciseDaySet } from "../__models/exercise-day-set";
import { ExerciseSetState } from "../__models/exercise-set-state";
import { DayProvider } from 'home/days/day/day.context';
import { BlockProvider } from 'home/blocks/block/block.context';

interface ExerciseSetBodyProps {
    exerciseBody: ExerciseDaySet[];
    dayBodyState: [ExerciseSetState, Dispatch<ExerciseSetState>];
    volumeState: [VolumeState];
}
export default function ExerciseSetBody({ exerciseBody, dayBodyState, volumeState }: ExerciseSetBodyProps) {
    const [day] = useContext(DayProvider);
    const [block, setBlock] = useContext(BlockProvider);

    const onChangeWeight = (newWeight: number, exercise: Exercises) => {
        const blockConfig = block.exercise_configuration[exercise];

        switch (day.rep_goal) {
            case 6:
            case 3:
                newWeight += blockConfig.modifier;
                break;
            case 4:
                newWeight -= blockConfig.modifier;
                break;
        }

        block.exercise_configuration[exercise].medium_weight = newWeight;
        setBlock(block);
    }

    return (
        <div className="ExerciseSetBody">
            {exerciseBody?.map(exDay => {
                const { key, title, repsAndSeries, exercise, modifier, weight, seriesArray } = exDay;
                return (
                    <div key={key} className="ExerciseSetBody__exercise">
                        <strong className="ExerciseSetBody__exercise-info">
                            <span>{title} ({repsAndSeries})</span>
                            <LadderInput value={weight}
                                modifier={modifier}
                                onChange={(nw) => onChangeWeight(nw, exercise)}
                            />
                        </strong>
                        <RepsTracker exercise={exercise}
                            seriesArray={seriesArray}
                            dayBodyState={dayBodyState}
                            volumeState={volumeState} />
                    </div>
                );
            })}
        </div>);
}
