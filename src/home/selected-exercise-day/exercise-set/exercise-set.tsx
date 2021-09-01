import './exercise-set.css';
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseBlock, Exercises } from 'home/blocks/block/block.model';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import Store from 'home/__helpers/store/store';
import { User, useSetDay } from '../../__states';
import buildResetState from './__helpers/build-reset-state';
import { useContext } from 'react';
import { HomeProvider } from 'home/__states';
import findFailedExercises from './__helpers/find-failed-exercises';
import copyOfDayWithState from './__helpers/copy-day-with-state';
import useDay from 'home/__states/day';
import useBlock from 'home/__states/block';
import TextInput from '__components__/input-field/text-input-field/text-input-field';

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

    const onChangeDate = (newDate: string) => {
        const newDay = copyOfDayWithState(dayData, daySetState);
        setDayData({ ...newDay, date: newDate });
    }

    function onConfirmChangeWeight(newValue: string, exercise: Exercises) {
        const { modifier } = blockData.exercise_configuration[exercise];
        const oldWeight = dayExerciseBody.find(e => e.exercise === exercise)!.weight;
        let newWeight = +newValue;

        if (newWeight !== oldWeight && window.confirm('Are you sure? This would change the whole block')) {
            // weight for low weeks is lower than modifer, and for 3rd week is higher. So we normalize
            if (day.rep_goal === 6 || day.rep_goal === 3) newWeight += modifier;
            if (day.rep_goal === 4) newWeight -= modifier;

            blockData.exercise_configuration[exercise]!.medium_weight = newWeight;
            setBlockData(blockData);
            console.log(blockData);
       }
    }

    return (<article className="ExerciseSet">
        <hr className="delimiter" />
        <h3 className="ExerciseSet__title">
            <span className="ExerciseSet__title-child">{(id !== -1) ? `Exercise #${id}` : 'New Exercise'}</span>
            <span className="ExerciseSet__title-child">Rep goal: {rep_goal}</span>
            <TextInput value={dayData.date} onBlur={onChangeDate}/>
        </h3>

        <div className="ExerciseSet__reps">
            {dayExerciseBody?.map(exDay => {
                const { key, title, repsAndSeries, weight, exercise, seriesArray } = exDay;
                return (
                    <div key={key} className="ExerciseSet__reps-exercise">
                        <strong className="ExerciseSet__exercise-info">
                            <span>{title} ({repsAndSeries})</span>
                            <TextInput value={weight}
                                onBlur={(nv) => onConfirmChangeWeight(nv, exercise)}
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
