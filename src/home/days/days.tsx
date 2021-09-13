import './days.css';
import Day from "./day/day";
import { ExerciseDay } from "./day/day.model";
import { MouseEvent, useContext } from "react";
import { DaysProvider } from "./days.context";
import { SelectedBlockProvider, SelectedDayProvider } from "home/__states";
import { blockStore } from 'home/blocks/blocks.state';
import bannerConfirm from '__components__/confirm-banner/confirm-banner';
import { dayStore, weekForDayIndex } from './days.state';
import { UserProvider } from 'home/user/user.context';
import { BlocksProvider } from 'home/blocks/blocks.context';

export default function Days(): JSX.Element {
    const [days] = useContext(DaysProvider);
    const [blocks] = useContext(BlocksProvider)
    const [selectedDay, onSelectDay] = useContext(SelectedDayProvider);
    const [selectedBlock] = useContext(SelectedBlockProvider);
    const [user, setUser] = useContext(UserProvider);

    const onDeleteDay = async (id: number, event: MouseEvent<HTMLElement>) => {
        const selection = await bannerConfirm(`Are you sure to delete day #${id}?`, event);
        if (selection) {
            const block = blocks.find(block => block.id === selectedBlock);

            if (block) {
                const updatedBLockIds =  block.day_ids.filter(d => d !== id);
                Object.values(block.exercise_configuration).forEach(exConfig => {
                    exConfig.failed_day_ids = exConfig.failed_day_ids.filter(d => d !== id);
                });
                blockStore.patch({ ...block, day_ids: updatedBLockIds });
                dayStore.delete(`${id}`);
                setUser({ ...user, blockIds: [...user.blockIds] });
            }
        }
    }

    return (<div className="Days">
        {days
            .reduce((tuple, day, i) => {
                const week = weekForDayIndex(i);
                if (!tuple[week]) tuple[week] = [];
                tuple[week].push(day);
                return tuple;
            }, [] as [ExerciseDay?, ExerciseDay?, ExerciseDay?][])
            .map((dayTuple, week) => 
                <div key={week} className="Days__week">
                    <strong className="Days__week-title">Week {week + 1}</strong>
                    <div className="Days__week-days">
                        {dayTuple.map(day =>
                            <div className="Days__day-wrapper" key={day?.id} onClick={() => onSelectDay(day!.id)}>
                                {day?.id !== -1 && <strong className="Days__day-delete" onClick={(e) => onDeleteDay(day!.id, e)}>X</strong>}
                                <Day day={day!} selected={selectedDay === day?.id}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>)
}
