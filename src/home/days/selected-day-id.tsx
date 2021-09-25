import { DaysProvider } from "home/days/days.context";
import React, { Dispatch, useContext, useEffect, useState } from "react";

function useSelectedDayId(days: { id: number }[]) {
    const [selectedDay, setSelectedDay] = useState<number>(-1);
    
    useEffect(() => {
        if (days.length) {
            const selectedDayId = days[days.length - 1]?.id || -1;
            setSelectedDay(selectedDayId);
        }
    }, [days]);

    return [selectedDay, setSelectedDay] as [number, Dispatch<number>];
}

export const SelectedDayIdProvider = React.createContext<[number, Dispatch<number>]>([-1, () => {}]);
export function SelectedDayId({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [days] = useContext(DaysProvider);
    const [selected, setSelected] = useSelectedDayId(days);

    return (
        <SelectedDayIdProvider.Provider value={[selected, setSelected]}>
            {children}
        </SelectedDayIdProvider.Provider>
    );
}
