type DayWeightProps = { dayId: number; medium_weight: number, modifier: number, rep_goal: number; failed_day_ids: number[] };
export default function getDayWeight({ dayId, medium_weight, modifier, rep_goal, failed_day_ids }: DayWeightProps): number {
    const baseWeight = medium_weight - (failed_day_ids.filter(day => day < dayId || dayId === -1).length ? modifier : 0);
    if (rep_goal === 6 || rep_goal === 3) {
        return baseWeight - modifier;
    }
    if (rep_goal === 4) {
        return baseWeight + modifier;
    }
    return baseWeight;
}
