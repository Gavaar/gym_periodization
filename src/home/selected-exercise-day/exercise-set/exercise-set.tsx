import './exercise-set.css';
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseBlock, Exercises } from 'home/blocks/block/block.model';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import Store from 'home/__helpers/store/store';
import { User, useSetDay } from '../../__states';
import buildResetState from './__helpers/build-reset-state';
import React, { useContext } from 'react';
import { HomeProvider } from 'home/__states';
import findFailedExercises from './__helpers/find-failed-exercises';
import copyOfDayWithState from './__helpers/copy-day-with-state';
import useDay from 'home/__states/day';
import useBlock from 'home/__states/block';

interface ExerciseSetProps { day: ExerciseDay; block: ExerciseBlock };
function ExerciseSet({ day, block }: ExerciseSetProps): JSX.Element {
    const dayStore = new Store<ExerciseDay>('days');
    const blockStore = new Store<ExerciseBlock>('blocks');
    const userStore = new Store<User>('users');
    const [blockIds, setBlockIds] = useContext(HomeProvider);
    const [dayData, setDayData] = useDay(day);
    const [blockData, setBlockData] = useBlock(block);
    const { id, rep_goal } = dayData;
    const { daySetState, dayExerciseBody, setDayBody } = useSetDay(dayData, blockData);

    const onReset = () => {
        const dayExerciseBody = buildResetState(dayData, blockData);
        setDayBody(dayExerciseBody);
    }

    const onSave = () => {
        const refreshBlockIds = [...blockIds];
        const dayToSave: ExerciseDay = copyOfDayWithState(dayData, daySetState);
        const blockToSave: ExerciseBlock = { ...blockData };
        const failedExercisesFromDay: Exercises[] = findFailedExercises(dayToSave);

        if (dayData.id === -1) {
            dayData.id = dayStore.create(dayToSave).id;
            blockToSave.day_ids = Array.from(new Set([...blockData.day_ids, dayData.id]));
        } else {
            dayStore.update(dayData.id, dayToSave);
        }

        (Object.keys(blockToSave.exercise_configuration) as Exercises[]).forEach(ex => {
            const config = blockToSave.exercise_configuration[ex];
            config.failed_day_ids = config.failed_day_ids.filter(id => id !== dayData.id);

            if (failedExercisesFromDay.includes(ex)) {
                config.failed_day_ids.push(dayData.id);
            }
        });

        if (blockData.id === -1) {
            blockData.id = blockStore.create(blockToSave).id;
            refreshBlockIds.push(blockData.id);
            userStore.update(1, { id: 1, blockIds: refreshBlockIds });
        } else {
            blockStore.update(blockData.id, blockToSave);
        }

        setBlockIds(refreshBlockIds);
    };

    const onChangeNumber = (serieKey: string, nv: number | undefined) => {
        setDayBody({ ...daySetState, [serieKey]: nv });
    }

    const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDayData({ ...dayData, date: event.target.value });
    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>, exercise: Exercises) => {
        const _block = { ...blockData };
        _block.exercise_configuration[exercise].medium_weight = +event.target.value;
        setBlockData(_block);
    }

    return (<article className="ExerciseSet">
        <hr className="delimiter" />
        <h3 className="ExerciseSet__title">
            <span className="ExerciseSet__title-child">{(id !== -1) ? `Exercise #${id}` : 'New Exercise'}</span>
            <span className="ExerciseSet__title-child">Rep goal: {rep_goal}</span>
            <input className="ExerciseSet__input" value={dayData.date} onChange={onChangeDate} />
        </h3>

        <div className="ExerciseSet__reps">
            {dayExerciseBody?.map(exDay => {
                const { key, title, repsAndSeries, exercise, seriesArray } = exDay;
                return (
                    <div key={key} className="ExerciseSet__reps-exercise">
                        <strong className="ExerciseSet__exercise-info">
                            <span>{title} ({repsAndSeries})</span>
                            <input className="ExerciseSet__input" type="number"
                                value={blockData.exercise_configuration[exercise].medium_weight}
                                onChange={e => onChangeWeight(e, exercise)} />Kg
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
                        </div>
                    </div>
                );
            })}
        </div>

        <div className="ExerciseSet__actions">
            <button onClick={onReset}>Reset</button>
            <button onClick={onSave}>Save</button>
        </div>
    </article>);
}
export default ExerciseSet;
