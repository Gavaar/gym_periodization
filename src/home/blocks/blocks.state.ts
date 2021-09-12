import { FireStore } from "home/__helpers/store/firestore";
import { Dispatch, useEffect, useState } from "react";
import { ExerciseBlock, NewExerciseBlock } from "../blocks/block/block.model";

export const blockStore = new FireStore<ExerciseBlock>('exercises/blocks');

function addNewBlockWhenLastIsFull(blocks: ExerciseBlock[]): ExerciseBlock[] {
    const lastBlock = blocks[0];

    if (!blocks.length) {
        blocks.push(new NewExerciseBlock());
    }
    if (lastBlock?.day_ids.length >= 12) {
        const { exercise_configuration } = lastBlock;
        blocks.unshift(new NewExerciseBlock(exercise_configuration));
    }

    return blocks;
}

function getBlock(id: number): Promise<ExerciseBlock> {
    return blockStore.get(`${id}`) as Promise<ExerciseBlock>;
}
export function useBlocks(ids?: number[]): [ExerciseBlock[], Dispatch<ExerciseBlock[]>] {
    const [blocks, setBlocks] = useState<ExerciseBlock[]>([]);

    useEffect(() => {
        const idPromises = (ids || []).map(id => getBlock(id)).reverse();
        Promise.all(idPromises).then(blocks => {
            setBlocks(addNewBlockWhenLastIsFull(blocks));
        });
    }, [ids]);

    return [blocks, setBlocks];
}
