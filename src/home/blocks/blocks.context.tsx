import { UserProvider } from "home/user/user.context";
import React, { Dispatch, useContext } from "react";
import { ExerciseBlock } from "./block/block.model";
import { useBlocks } from "./blocks.state";

export const BlocksProvider = React.createContext<[ExerciseBlock[], Dispatch<ExerciseBlock[]>]>([[], ()=>{}]);

export function BlocksContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [user] = useContext(UserProvider);
    const [blocks, setBlocks] = useBlocks(user?.blockIds);
    return (
        <BlocksProvider.Provider value={[blocks, setBlocks]}>
            {children}
        </BlocksProvider.Provider>
    );
}
