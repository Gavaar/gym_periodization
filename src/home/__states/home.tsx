import Store from "home/__helpers/store/store";
import React, { Dispatch, useEffect, useState } from "react";

export interface User { id: number; blockIds: number[] };
function useHome(): [number[], Dispatch<React.SetStateAction<number[]>>] {
    const [blockIds, setBlockIds] = useState<number[]>([]);

    useEffect(() => {
        const userStore = new Store<User>('users');
        const { blockIds } = userStore.get(1) || { id: 1, blockIds: [] };
        setBlockIds(blockIds);
    }, []);

    return [blockIds, setBlockIds];
}

export const HomeProvider = React.createContext<[number[], Dispatch<number[]>]>([[], () => {}]);
export function HomeContext({ children }: JSX.ElementChildrenAttribute) {
    const [blockIds, setBlockIds] = useHome();
    return (
        <HomeProvider.Provider value={[blockIds, setBlockIds]}>
            {children}
        </HomeProvider.Provider>
    );
}
