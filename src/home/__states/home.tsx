import { FireStore } from "home/__helpers/store/firestore";
import React, { Dispatch, useEffect, useState } from "react";

export interface User { blockIds: number[] };
export const userStore = new FireStore<User>('user');

function useHome(): [number[], Dispatch<React.SetStateAction<number[]>>] {
    const [blockIds, setBlockIds] = useState<number[]>([]);

    useEffect(() => {
        userStore.get().then(user => {
            setBlockIds((user as User)?.blockIds || [])
        })
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
