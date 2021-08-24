import Store from "home/__helpers/store/store";
import { useEffect, useState } from "react";
import { ExerciseBlock, NewExerciseBlock } from "../blocks/block/block.model";

function addNewBlockWhenLastIsFull(blocks: ExerciseBlock[]): ExerciseBlock[] {
    const { length } = blocks;
    const lastBlock = blocks[length - 1];

    if (lastBlock?.day_ids.length >= 12) {
        const { exercise_configuration } = lastBlock;
        blocks.push(new NewExerciseBlock(exercise_configuration));
    }

    return blocks;
}

async function getBlock(id: number): Promise<ExerciseBlock> {
    const store = new Store<ExerciseBlock>('blocks');
    return new Promise((resolve, reject) => {
        try {
            const block = store.get(id);
            resolve(block)
        } catch (error) {
            reject(error);
        }
    });
}
export function useBlocks(ids: number[]): ExerciseBlock[] {
    const [blocks, setBlocks] = useState<ExerciseBlock[]>([]);

    useEffect(() => {
        const idPromises = ids.map(id => getBlock(id));
        Promise.all(idPromises).then(blocks => {
            setBlocks(addNewBlockWhenLastIsFull(blocks));
        });
    }, [ids]);

    return blocks;
}
