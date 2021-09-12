import { ExerciseBlock } from "home/blocks/block/block.model";
import { BlocksProvider } from "home/blocks/blocks.context";
import { SelectedBlockProvider } from "home/__states";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { ExerciseDay } from "./day/day.model";
import { useDays } from "./days.state";

export const DaysProvider = React.createContext<[ExerciseDay[], Dispatch<ExerciseDay[]>]>([[], () => {}]);

function useDayIds(blocks: ExerciseBlock[], selectedBlock: number): [number[], Dispatch<number[]>] {
    const [dayIds, setDayIds] = useState<number[]>([]);

    useEffect(() => {
        setDayIds(blocks.find(b => b.id === selectedBlock)?.day_ids || []);
    }, [blocks, selectedBlock]);

    return [dayIds, setDayIds];
}

export function DaysContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [blocks] = useContext(BlocksProvider);
    const [selectedBlock] = useContext(SelectedBlockProvider);
    const [dayIds] = useDayIds(blocks, selectedBlock);
    const [days, setDays] = useDays(dayIds);

    return (
        <DaysProvider.Provider value={[days, setDays]}>
            {children}
        </DaysProvider.Provider>
    );
}
