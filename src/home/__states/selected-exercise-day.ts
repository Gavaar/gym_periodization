import { ExerciseBlock } from "home/blocks/block/block.model";
import { BlocksContextProvider } from "home/blocks/blocks.context";
import { ExerciseDay } from "home/days/day/day.model";
import { DayContextProvider } from "home/days/days.context";
import { useContext, useEffect, useState } from "react";

export function useSelectedExerciseDay({ selectedDay, selectedBlock }: { selectedDay: number, selectedBlock: number }) {
    const days = useContext(DayContextProvider);
    const blocks = useContext(BlocksContextProvider);
    const [exDay, setExDay] = useState<{ day: ExerciseDay; block: ExerciseBlock }>({} as { day: ExerciseDay; block: ExerciseBlock });

    useEffect(() => {
        const day = days.find(day => day.id === selectedDay) || days[days.length - 1];
        const block = blocks.find(block => block?.id === selectedBlock) || blocks[blocks.length - 1];
        setExDay({ day, block });
    }, [selectedDay, selectedBlock, blocks, days]);

    return exDay;
}
