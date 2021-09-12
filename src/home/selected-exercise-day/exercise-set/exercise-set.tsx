import './exercise-set.css';
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseBlock, Exercises } from 'home/blocks/block/block.model';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import { useSetDay } from '../../__states';
import buildResetState from './__helpers/build-reset-state';
import { useContext, useEffect, useState } from 'react';
import { HomeProvider } from 'home/__states';
import findFailedExercises from './__helpers/find-failed-exercises';
import copyOfDayWithState from './__helpers/copy-day-with-state';
import useDay from 'home/__states/day';
import useBlock from 'home/__states/block';
import LadderInput from '__components__/input-field/ladder-input-field/ladder-input-field';
import { userStore, dayStore } from 'home/__states';
import { blockStore } from 'home/blocks/blocks.state';
import { ExerciseDaySet } from './__models/exercise-day-set';
import DatepickerInput from '__components__/input-field/datepicker-input-field/datepicker-input-field';
import { DaysProvider } from 'home/days/days.context';

type VolumeState = { [key in Exercises]?: number } & { total?: number};
function useVolume(daySetState: { [ex: string]: number | undefined }, dayExerciseBody: ExerciseDaySet[]): VolumeState {
    const [volume, setVolume] = useState<VolumeState>({});

    useEffect(() => {
        const repsByExercise = Object.keys(daySetState).reduce((reps, key) => {
                const ex = key.split('::')[0] as Exercises;
                reps[ex] = (reps[ex] || 0) + (daySetState[key] || 0);
                return reps;
            }, {} as { [e in Exercises]: number });

        const newVolume = dayExerciseBody.reduce((vol, { exercise, weight }) => {
            const addedValue = (repsByExercise[exercise] || 0) * weight;
            vol[exercise] = (vol[exercise] || 0) + addedValue;
            vol.total = (vol.total || 0) + addedValue;
            return vol;
        }, {} as VolumeState);

        setVolume(newVolume);
    }, [daySetState, dayExerciseBody]);

    return volume;
}

function useDayDates(days: ExerciseDay[]) {
    const [dayDates, setDayDates] = useState<string[]>([]);
    useEffect(() => {
        setDayDates(days.filter(d => +d.id !== -1).map(d => d.date))
    }, [days])
    return [dayDates];
}

interface ExerciseSetProps { day: ExerciseDay; block: ExerciseBlock };
function ExerciseSet({ day, block }: ExerciseSetProps): JSX.Element {
    const days = useContext(DaysProvider);
    const [dayDates] = useDayDates(days);
    const [blockIds, setBlockIds] = useContext(HomeProvider);
    const [dayData, setDayData] = useDay(day);
    const [blockData, setBlockData] = useBlock(block);
    const { id, rep_goal } = dayData;
    const { daySetState, dayExerciseBody, setDayBody } = useSetDay(dayData, blockData);
    const volume = useVolume(daySetState, dayExerciseBody);

    const onReset = () => {
        const dayExerciseBody = buildResetState(dayData, blockData);
        setDayBody(dayExerciseBody);
    }

    const onSave = async () => {
        const refreshBlockIds = [...blockIds];
        const dayToSave: ExerciseDay = copyOfDayWithState(dayData, daySetState);
        const blockToSave: ExerciseBlock = { ...blockData };
        const failedExercisesFromDay: Exercises[] = findFailedExercises(dayToSave);

        if (dayData.id === -1) {
            const newDay = await dayStore.patch(dayToSave);
            dayData.id = newDay!.id;
            blockToSave.day_ids = Array.from(new Set([...blockData.day_ids, dayData.id]));
        } else {
            await dayStore.patch(dayToSave);
        }

        (Object.keys(blockToSave.exercise_configuration) as Exercises[]).forEach(ex => {
            const config = blockToSave.exercise_configuration[ex];
            config.failed_day_ids = config.failed_day_ids.filter(id => id !== dayData.id);

            if (failedExercisesFromDay.includes(ex)) {
                config.failed_day_ids.push(dayData.id);
            }
        });

        if (blockData.id === -1) {
            const newBlock = await blockStore.patch(blockToSave);
            blockData.id = newBlock!.id;
            refreshBlockIds.push(blockData.id);
            await userStore.patch({ blockIds: refreshBlockIds })
            setBlockIds(refreshBlockIds);
        } else {
            await blockStore.patch(blockToSave);
            setBlockIds(refreshBlockIds);
        }
    };

    const onChangeNumber = (serieKey: string, nv: number | undefined) => {
        setDayBody({ ...daySetState, [serieKey]: nv });
    }

    const onChangeDate = (newDate: string) => {
        const newDay = copyOfDayWithState(dayData, daySetState);
        setDayData({ ...newDay, date: newDate });
    }

    const onChangeWeight = (newWeight: number, exercise: Exercises) => {
        const blockConfig = blockData.exercise_configuration[exercise];

        switch (day.rep_goal) {
            case 6:
            case 3:
                newWeight += blockConfig.modifier;
                break;
            case 4:
                newWeight -= blockConfig.modifier;
                break;
        }

        blockData.exercise_configuration[exercise].medium_weight = newWeight;
        setBlockData(blockData);
    }

    return (<article className="ExerciseSet">
        <hr className="delimiter" />
        <h3 className="ExerciseSet__title">
            <span>{(id !== -1) ? `Ex. ${`${id}`.substring(0, 5)}` : 'New Exercise'}</span>
            <span>Rep goal: {rep_goal}</span>
            <DatepickerInput value={dayData.date} onSelect={onChangeDate} highlightDays={dayDates} />
        </h3>

        <div className="ExerciseSet__reps">
            {dayExerciseBody?.map(exDay => {
                const { key, title, repsAndSeries, exercise, modifier, weight, seriesArray } = exDay;
                return (
                    <div key={key} className="ExerciseSet__reps-exercise">
                        <strong className="ExerciseSet__exercise-info">
                            <span>{title} ({repsAndSeries})</span>
                            <LadderInput value={weight}
                                modifier={modifier}
                                onChange={(nw) => onChangeWeight(nw, exercise)}
                            />
                        </strong>
                        <div className="ExerciseSet__reps-buttons">
                            {seriesArray.map(serie => {
                                const { serieKey, maxValue } = serie;

                                return <DecreasingNumberButton
                                    key={serieKey}
                                    maxValue={maxValue}
                                    value={daySetState[serieKey]}
                                    onChange={nv => onChangeNumber(serieKey, nv)}
                                />
                            })}
                            <i className="ExerciseSet__reps-volume">{volume[exercise] ? <span>Volume: {volume[exercise]}Kg</span> : null}</i>
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="ExerciseSet__footer">
            <div className="ExerciseSet__actions">
                <button onClick={onReset}>Reset</button>
                <button onClick={onSave}>Save</button>
            </div>
            <i>{volume.total ? <span>Total: {volume.total}</span> : null}</i>
        </div>
    </article>);
}
export default ExerciseSet;
