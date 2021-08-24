import { checkMark, emptySpan, failMark } from "home/config";

interface WeekConfig { exerciseName: string; modifier: number; weight: number; weekSuccess: [boolean?, boolean?, boolean?, boolean?] };

function ExerciseByWeek({ exerciseName, modifier, weight, weekSuccess }: WeekConfig): JSX.Element {
    const startingWeight = weight - modifier;
    const endingWeight = weekSuccess.includes(false) ? weight : weight + modifier;
    const emptyArray = Array.from(Array(4 - weekSuccess.length), () => undefined);
    const weekChecks = [...weekSuccess, ...emptyArray].map(v => {
        if (v === true) return checkMark;
        if (v === false) return failMark;
        return emptySpan;
    })

    return (
        <div className="Block__week">
            <strong className="Block__week-exercise">{ exerciseName }</strong>
            <i className="Block__week-weight">
                <span>{startingWeight} - {endingWeight} Kg</span>
            </i>
            <div className="Block__week-successes">
                { weekChecks.map((el, i) => <span key={i}>{el}</span>) }
            </div>
        </div>
    );
}
export default ExerciseByWeek;
