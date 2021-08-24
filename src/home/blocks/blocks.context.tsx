import { HomeProvider } from "home/__states";
import React, { useContext } from "react";
import { ExerciseBlock } from "./block/block.model";
import { useBlocks } from "../__states";

export const BlocksContextProvider = React.createContext<ExerciseBlock[]>([]);

export function BlocksContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [ids] = useContext(HomeProvider);
    const blocks = useBlocks(ids);
    return (
        <BlocksContextProvider.Provider value={blocks}>
            {children}
        </BlocksContextProvider.Provider>
    );
}
