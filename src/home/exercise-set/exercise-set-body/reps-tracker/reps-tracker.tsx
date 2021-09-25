import './reps-tracker.css';
import { Exercises } from "home/blocks/block/block.model";
import { Dispatch } from "react";
import DecreasingNumberButton from "__components__/decreasing-number-button/decreasing-number-button";
import { VolumeState } from "../../exercise-set-footer/volume/volume.state";
import { SeriesExerciseDaySet } from "../../__models/exercise-day-set";
import { ExerciseSetState } from "../../__models/exercise-set-state";

interface RepsTrackerProps {
    exercise: Exercises;
    seriesArray: SeriesExerciseDaySet[];
    volumeState: [VolumeState];
    dayBodyState: [ExerciseSetState, Dispatch<ExerciseSetState>];
}
export default function RepsTracker({ exercise, volumeState, dayBodyState, seriesArray }: RepsTrackerProps) {
    const [volume] = volumeState;
    const [dayBody, setDayBody] = dayBodyState;

    const onChangeNumber = (serieKey: string, nv: number | undefined) => {
        setDayBody({ ...dayBody, [serieKey]: nv });
    }

    return (
        <div className="RepsTracker">
            {seriesArray.map(serie => {
                const { serieKey, maxValue } = serie;

                return <DecreasingNumberButton
                    key={serieKey}
                    maxValue={maxValue}
                    value={dayBody[serieKey]}
                    onChange={nv => onChangeNumber(serieKey, nv)}
                />
            })}
            <i className="RepsTracker__volume">{volume[exercise] ? <span>Volume: {volume[exercise]}Kg</span> : null}</i>
        </div>);
}
