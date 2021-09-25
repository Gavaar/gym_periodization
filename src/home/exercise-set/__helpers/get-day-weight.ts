const TRAININGS_PER_WEEK = 3;

function findLatestIndexInWeekOfJindex(jindex: number): number {
    const firstIndexOfWeek = Math.floor(jindex / TRAININGS_PER_WEEK) * TRAININGS_PER_WEEK;
    const weekIndexLength = TRAININGS_PER_WEEK - 1;
    return firstIndexOfWeek + weekIndexLength;
}

function exerciseFailedOnPreviousWeek(orderedIdsInBlock: number[], failedDayIds: number[], currentDayId: number): boolean {
    if (!failedDayIds.length) {
        return false;
    }

    const { currentDayIndex, earliestWeekFailLatestDay } = orderedIdsInBlock.reduce((indexes, id, j) => {
        if (currentDayId === id) {
            indexes.currentDayIndex = j;
        }

        if (failedDayIds.includes(id) && indexes.earliestWeekFailLatestDay === -1) {
            indexes.earliestWeekFailLatestDay = findLatestIndexInWeekOfJindex(j);
        }

        return indexes;
    }, { currentDayIndex: -1, earliestWeekFailLatestDay: -1 });

    if (currentDayIndex <= earliestWeekFailLatestDay) {
        return false;
    }

    return true;
}

type DayWeightProps = { dayId: number; medium_weight: number; modifier: number; rep_goal: number; failed_day_ids: number[]; ordered_day_ids_in_block: number[] };
export default function getDayWeight({ dayId, medium_weight, modifier, rep_goal, failed_day_ids, ordered_day_ids_in_block }: DayWeightProps): number {
    const failedOnPreviousWeek = exerciseFailedOnPreviousWeek(ordered_day_ids_in_block, failed_day_ids, dayId);
    const baseModifier = failedOnPreviousWeek ? modifier : 0;
    const baseWeight = medium_weight - baseModifier;

    if (rep_goal === 6 ) {
        return baseWeight - modifier;
    }
    if (rep_goal === 4 || rep_goal === 3) {
        return baseWeight + modifier;
    }
    return baseWeight;
}
