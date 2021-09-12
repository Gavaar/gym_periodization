import { ExerciseBlock } from "home/blocks/block/block.model";
import { BlocksProvider } from "home/blocks/blocks.context";
import { ExerciseDay } from "home/days/day/day.model";
import { DaysProvider } from "home/days/days.context";
import { useContext, useEffect, useState } from "react";

export function useSelectedExerciseDay({ selectedDay, selectedBlock }: { selectedDay: number, selectedBlock: number }) {
    const [days] = useContext(DaysProvider);
    const [blocks] = useContext(BlocksProvider);
    const [exDay, setExDay] = useState<{ day: ExerciseDay; block: ExerciseBlock }>({} as { day: ExerciseDay; block: ExerciseBlock });

    useEffect(() => {
        const day = days.find(day => day.id === selectedDay) || days[days.length - 1];
        const block = blocks.find(block => block.id === selectedBlock) || blocks[blocks.length - 1];
        setExDay({ day, block });
    }, [selectedDay, selectedBlock, blocks, days]);

    return exDay;
}
