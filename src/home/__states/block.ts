import { ExerciseBlock } from "home/blocks/block/block.model";
import { Dispatch, useEffect, useState } from "react";

export default function useBlock(block: ExerciseBlock): [ExerciseBlock, Dispatch<ExerciseBlock>] {
    const [blockData, setBlockData] = useState(block);

    useEffect(() => {
        setBlockData(block);
    }, [block]);

    return [blockData, setBlockData];
}
