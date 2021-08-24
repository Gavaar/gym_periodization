import { ExerciseBlock } from "home/blocks/block/block.model";
import { BlocksContextProvider } from "home/blocks/blocks.context";
import { SelectedBlockProvider } from "home/__states";
import React, { useContext, useEffect, useState } from "react";
import { ExerciseDay } from "./day/day.model";
import { useDays } from "../__states";

export const DayContextProvider = React.createContext<ExerciseDay[]>([]);

function useDayIds(blocks: ExerciseBlock[], selectedBlock: number): number[] {
    const [dayIds, setDayIds] = useState<number[]>([]);

    useEffect(() => {
        setDayIds(blocks.find(b => b.id === selectedBlock)?.day_ids || []);
    }, [blocks, selectedBlock]);

    return dayIds;
}

export function DaysContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const blocks = useContext(BlocksContextProvider);
    const [selectedBlock] = useContext(SelectedBlockProvider);
    const dayIds = useDayIds(blocks, selectedBlock);

    const days = useDays(dayIds);
    return (
        <DayContextProvider.Provider value={days}>
            {children}
        </DayContextProvider.Provider>
    );
}
