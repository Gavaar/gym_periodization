import React, { Dispatch, useContext, useEffect, useState } from "react";
import { DaysProvider } from "../days.context";
import { SelectedDayIdProvider } from "../selected-day-id";
import buildNewDay from "../__helpers/build-new-day";
import { ExerciseDay } from "./day.model";

const defaultDay = buildNewDay({ week: 1 });
export const DayProvider = React.createContext<[ExerciseDay, Dispatch<ExerciseDay>]>([defaultDay, () => {}]);

function useDay(days: ExerciseDay[], selectedDayId: number): [ExerciseDay, Dispatch<ExerciseDay>] {
    const [day, setDay] = useState<ExerciseDay>(defaultDay);

    useEffect(() => {
        const selectedDay = days.find(d => d.id === selectedDayId) || defaultDay;
        setDay(selectedDay);
    }, [days, selectedDayId]);

    return [day, setDay];
}

export function DayContext({ children }: JSX.ElementChildrenAttribute): JSX.Element {
    const [days] = useContext(DaysProvider);
    const [selectedDayId] = useContext(SelectedDayIdProvider);
    const [day, setDay] = useDay(days, selectedDayId);

    return (<DayProvider.Provider value={[day, setDay]}>
        {children}
    </DayProvider.Provider>);
}
