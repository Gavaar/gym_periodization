import './exercise-set.css';
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseBlock, Exercises } from 'home/blocks/block/block.model';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import Store from 'home/__helpers/store/store';
import { useSetDay } from '../../__states';
import buildResetState from './__helpers/build-reset-state';
import React, { useContext } from 'react';
import { HomeProvider } from 'home/__states';
import findFailedExercises from './__helpers/find-failed-exercises';
import copyOfDayWithState from './__helpers/copy-day-with-state';
import useDay from 'home/__states/day';

interface ExerciseSetProps { day: ExerciseDay; block: ExerciseBlock };
function ExerciseSet({ day, block }: ExerciseSetProps): JSX.Element {
    const { id, rep_goal } = day;
    const dayStore = new Store<ExerciseDay>('days');
    const blockStore = new Store<ExerciseBlock>('blocks');
    const [blockIds, setBlockIds] = useContext(HomeProvider);
    const { daySetState, dayExerciseBody, setDayBody } = useSetDay(day, block);
    const [dayData, setDayData] = useDay(day);

    const onReset = () => {
        const dayExerciseBody = buildResetState(day, block);
        setDayBody(dayExerciseBody);
    }

    const onSave = () => {
        let savedNew = false;
        const dayToSave: ExerciseDay = copyOfDayWithState(dayData, daySetState);
        const blockToSave: ExerciseBlock = { ...block };

        const failedExercisesFromDay: Exercises[] = findFailedExercises(dayToSave);

        if (day.id === -1) {
            day.id = dayStore.create(dayToSave).id;
            blockToSave.day_ids = Array.from(new Set([...block.day_ids, day.id]));
            savedNew = true;
        } else {
            dayStore.update(day.id, dayToSave);
        }

        (Object.keys(blockToSave.exercise_configuration) as Exercises[]).forEach(ex => {
            const config = blockToSave.exercise_configuration[ex];
            config.failed_day_ids = config.failed_day_ids.filter(id => id !== day.id);

            if (failedExercisesFromDay.includes(ex)) {
                config.failed_day_ids.push(day.id);
            }

            savedNew = true;
        });

        if (block.id === -1) {
            block.id = blockStore.create(blockToSave).id;
            savedNew = true;
        } else {
            blockStore.update(block.id, blockToSave);
        }

        if (savedNew) {
            setBlockIds([...blockIds]);
        }
    };

    const onChangeNumber = (serieKey: string, nv: number | undefined) => {
        setDayBody({ ...daySetState, [serieKey]: nv });
    }

    const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDayData({ ...day, date: event.target.value });
    }

    return (<article className="ExerciseSet">
        <hr className="delimiter" />
        <h3 className="ExerciseSet__title">
            <span className="ExerciseSet__title-child">{(id !== -1) ? `Exercise #${id}` : 'New Exercise'}</span>
            <span className="ExerciseSet__title-child">Rep goal: {rep_goal}</span>
            <input className="ExerciseSet__date-input" value={dayData.date} onChange={onChangeDate} />
        </h3>

        <div className="ExerciseSet__reps">
            {dayExerciseBody?.map(exDay => {
                const { key, title, repsAndSeries, weight, seriesArray } = exDay;
                return (
                    <div key={key} className="ExerciseSet__reps-exercise">
                        <strong>{title} ({repsAndSeries}) {weight}</strong>
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
