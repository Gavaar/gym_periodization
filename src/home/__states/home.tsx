import { FireStore } from "home/__helpers/store/firestore";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { LoggedUser, UserProvider } from "./user";

export interface User { blockIds: number[] };
export const userStore = new FireStore<User>('user');

function useHome(user: LoggedUser): [number[], Dispatch<React.SetStateAction<number[]>>] {
    const [blockIds, setBlockIds] = useState<number[]>([]);

    useEffect(() => {
        userStore.get().then(user => {
            setBlockIds((user as User)?.blockIds || [])
        })
    }, [user]);

    return [blockIds, setBlockIds];
}

export const HomeProvider = React.createContext<[number[], Dispatch<number[]>]>([[], () => {}]);
export function HomeContext({ children }: JSX.ElementChildrenAttribute) {
    const [user] = useContext(UserProvider);
    const [blockIds, setBlockIds] = useHome(user);

    return (
        <HomeProvider.Provider value={[blockIds, setBlockIds]}>
            {children}
        </HomeProvider.Provider>
    );
}
