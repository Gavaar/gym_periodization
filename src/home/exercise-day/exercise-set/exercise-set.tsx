import './exercise-set.css';
import { ExerciseDay } from "home/days/day/day.model";
import { ExerciseBlock, Exercises } from 'home/blocks/block/block.model';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import buildResetState from './__helpers/build-reset-state';
import { useContext } from 'react';
import findFailedExercises from './__helpers/find-failed-exercises';
import copyOfDayWithState from './__helpers/copy-day-with-state';
import LadderInput from '__components__/input-field/ladder-input-field/ladder-input-field';
import { blockStore } from 'home/blocks/blocks.state';
import DatepickerInput from '__components__/input-field/datepicker-input-field/datepicker-input-field';
import { DaysProvider } from 'home/days/days.context';
import { useBlock, useDay, useDayBody, useDayDates, useExerciseBody, useVolume } from './exercise-set.state';
import { dayStore } from 'home/days/days.state';
import { UserProvider } from 'home/user/user.context';
import { userStore } from 'home/user/user.state';

interface ExerciseSetProps { day: ExerciseDay; block: ExerciseBlock };
function ExerciseSet({ day, block }: ExerciseSetProps): JSX.Element {
    const [days] = useContext(DaysProvider);
    const [user, setUser] = useContext(UserProvider);
    const [dayDates] = useDayDates(days);
    const [dayData, setDayData] = useDay(day);
    const [blockData, setBlockData] = useBlock(block);
    const [exerciseBody] = useExerciseBody(dayData, blockData);
    const [dayBody, setDayBody] = useDayBody(exerciseBody);
    const volume = useVolume(dayBody, exerciseBody);
    const { id, rep_goal } = dayData;

    const onReset = () => {
        const dayExerciseBody = buildResetState(dayData, blockData);
        setDayBody(dayExerciseBody);
    }

    const onSave = async () => {
        const refreshBlockIds = [...(user?.blockIds || [])];
        const dayToSave: ExerciseDay = copyOfDayWithState(dayData, dayBody);
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
            const updatedUser = { blockIds: refreshBlockIds };
            setUser(updatedUser);
        } else {
            await blockStore.patch(blockToSave);
            setUser({ ...user, blockIds: [...user.blockIds] });
        }
    };

    const onChangeNumber = (serieKey: string, nv: number | undefined) => {
        setDayBody({ ...dayBody, [serieKey]: nv });
    }

    const onChangeDate = (newDate: string) => {
        const newDay = copyOfDayWithState(dayData, dayBody);
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
            {exerciseBody?.map(exDay => {
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
                                    value={dayBody[serieKey]}
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

// class ExerciseDayManager {
//     /**
//      * blockIds
//      * dayData
//      * dayBody
//      * blockData
//      * setBlockIds (F)
//      */
//     async onSave() {
//         const refreshBlockIds = [...blockIds];
//         const dayToSave: ExerciseDay = copyOfDayWithState(dayData, dayBody);
//         const blockToSave: ExerciseBlock = { ...blockData };
//         const failedExercisesFromDay: Exercises[] = findFailedExercises(dayToSave);

//         if (dayData.id === -1) {
//             const newDay = await dayStore.patch(dayToSave);
//             dayData.id = newDay!.id;
//             blockToSave.day_ids = Array.from(new Set([...blockData.day_ids, dayData.id]));
//         } else {
//             await dayStore.patch(dayToSave);
//         }

//         (Object.keys(blockToSave.exercise_configuration) as Exercises[]).forEach(ex => {
//             const config = blockToSave.exercise_configuration[ex];
//             config.failed_day_ids = config.failed_day_ids.filter(id => id !== dayData.id);

//             if (failedExercisesFromDay.includes(ex)) {
//                 config.failed_day_ids.push(dayData.id);
//             }
//         });

//         if (blockData.id === -1) {
//             const newBlock = await blockStore.patch(blockToSave);
//             blockData.id = newBlock!.id;
//             refreshBlockIds.push(blockData.id);
//             await userStore.patch({ blockIds: refreshBlockIds })
//             setBlockIds(refreshBlockIds);
//         } else {
//             await blockStore.patch(blockToSave);
//             setBlockIds(refreshBlockIds);
//         }
//     }; 
// }
