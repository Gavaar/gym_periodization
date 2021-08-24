import './days.css';
import { ExerciseBlock } from "home/blocks/block/block.model";
import Store from "home/__helpers/store/store";
import { weekForDayIndex } from "../__states/days";
import Day from "./day/day";
import { ExerciseDay } from "./day/day.model";
import { useContext } from "react";
import { DayContextProvider } from "./days.context";
import { SelectedDayProvider } from "home/__states";
import { HomeProvider } from 'home/__states';

export default function Days(): JSX.Element {
    const days = useContext(DayContextProvider);
    const [selectedDay, onSelectDay] = useContext(SelectedDayProvider);
    const [blockIds, setBlock] = useContext(HomeProvider);

    const onDeleteDay = (id: number) => {
        if (window.confirm(`Are you sure to delete day #${id}?`)) {   
            const dayStore = new Store<ExerciseDay>('days');
            const blockStore = new Store<ExerciseBlock>('blocks');
            const block = Object.values(blockStore.getList()).find(block => block.day_ids.includes(id))!;

            if (block) {
                dayStore.delete(id);
                blockStore.update(block.id, { ...block, day_ids: block.day_ids.filter(d => d !== id)});
                setBlock([...blockIds]);
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
                                {day?.id !== -1 && <strong className="Days__day-delete" onClick={() => onDeleteDay(day!.id)}>X</strong>}
                                <Day day={day!} selected={selectedDay === day?.id}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>)
}
