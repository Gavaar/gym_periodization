import React, { Dispatch, useContext, useEffect, useState } from "react";
import { BlocksProvider } from "../blocks.context";
import { SelectedBlockIdProvider } from "../selected-block-id";
import { ExerciseBlock, NewExerciseBlock } from "./block.model";

const defaultBlock = new NewExerciseBlock();
export const BlockProvider = React.createContext<[ExerciseBlock, Dispatch<ExerciseBlock>]>([defaultBlock, () => {}]);

function useBlock(blocks: ExerciseBlock[], selectedBlockId: number): [ExerciseBlock, Dispatch<ExerciseBlock>] {
    const [block, setBlock] = useState<ExerciseBlock>(defaultBlock);

    useEffect(() => {
        const selectedBlock = blocks.find(d => d.id === selectedBlockId) || defaultBlock;
        setBlock(selectedBlock);
    }, [blocks, selectedBlockId]);

    return [block, setBlock];
}

export function BlockContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [blocks] = useContext(BlocksProvider);
    const [selectedBlockId] = useContext(SelectedBlockIdProvider);
    const [block, setBlock] = useBlock(blocks, selectedBlockId);

    return (<BlockProvider.Provider value={[block, setBlock]}>
        {children}
    </BlockProvider.Provider>);
}
