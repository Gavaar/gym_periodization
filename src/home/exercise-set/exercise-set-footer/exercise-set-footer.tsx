import './exercise-set-footer.css';
import { ExerciseBlock, Exercises } from "home/blocks/block/block.model";
import { ExerciseDay } from "home/days/day/day.model";
import { UserProvider } from "home/user/user.context";
import { Dispatch, useContext } from "react";
import { Volume } from "./volume/volume";
import { userStore } from 'home/user/user.state';
import buildResetState from "../__helpers/build-reset-state";
import { VolumeState } from "./volume/volume.state";
import copyOfDayWithState from "../__helpers/copy-day-with-state";
import findFailedExercises from "../__helpers/find-failed-exercises";
import { dayStore } from "home/days/days.state";
import { blockStore } from "home/blocks/blocks.state";
import { ExerciseSetState } from "../__models/exercise-set-state";
import { DayProvider } from 'home/days/day/day.context';
import { BlockProvider } from 'home/blocks/block/block.context';

interface ExerciseSetFooterProps {
    volumeState: [VolumeState];
    dayBodyState: [ExerciseSetState, Dispatch<ExerciseSetState>];
}
export default function ExerciseSetFooter({ dayBodyState, volumeState }: ExerciseSetFooterProps) {
    const [day] = useContext(DayProvider);
    const [block] = useContext(BlockProvider);
    const [volume] = volumeState;
    const [dayBody, setDayBody] = dayBodyState;
    const [user, setUser] = useContext(UserProvider);
 
    const onReset = () => {
        const dayExerciseBody = buildResetState(day, block);
        setDayBody(dayExerciseBody);
    }

    const onSave = async () => {
        const refreshBlockIds = [...(user?.blockIds || [])];
        const dayToSave: ExerciseDay = copyOfDayWithState(day, dayBody);
        const blockToSave: ExerciseBlock = { ...block };
        const failedExercisesFromDay: Exercises[] = findFailedExercises(dayToSave);

        if (day.id === -1) {
            const newDay = await dayStore.patch(dayToSave);
            day.id = newDay!.id;
            blockToSave.day_ids = Array.from(new Set([...block.day_ids, day.id]));
        } else {
            await dayStore.patch(dayToSave);
        }

        (Object.keys(blockToSave.exercise_configuration) as Exercises[]).forEach(ex => {
            const config = blockToSave.exercise_configuration[ex];
            config.failed_day_ids = config.failed_day_ids.filter(id => id !== day.id);

            if (failedExercisesFromDay.includes(ex)) {
                config.failed_day_ids.push(day.id);
            }
        });

        if (block.id === -1) {
            const newBlock = await blockStore.patch(blockToSave);
            block.id = newBlock!.id;
            refreshBlockIds.push(block.id);
            await userStore.patch({ blockIds: refreshBlockIds })
            const updatedUser = { blockIds: refreshBlockIds };
            setUser(updatedUser);
        } else {
            await blockStore.patch(blockToSave);
            setUser({ ...user, blockIds: [...user.blockIds] });
        }
    };

    return (
        <div className="ExerciseSetFooter">
            <div className="ExerciseSetFooter__actions">
                <button onClick={onReset}>Reset</button>
                <button onClick={onSave}>Save</button>
            </div>
            <Volume volume={volume} />
        </div>);
}
