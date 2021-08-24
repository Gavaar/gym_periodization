import React, { Dispatch, useState } from "react";

function useHome(): [number[], Dispatch<number[]>] {
    const [home, setState] = useState<number[]>([1, 2]);
    return [home, setState];
}

export const HomeProvider = React.createContext<[number[], Dispatch<number[]>]>([[], () => {}]);
export function HomeContext({ children }: JSX.ElementChildrenAttribute) {
    const homeState = useHome();
    return (
        <HomeProvider.Provider value={homeState}>
            {children}
        </HomeProvider.Provider>
    );
}
