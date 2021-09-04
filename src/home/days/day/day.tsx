import './day.css';
import { ExerciseDay, exerciseShortName } from "./day.model";
import { checkMark, failMark } from 'home/config';
import { orderExercisesInObject } from 'home/__helpers/order-exercises/order-exercises';

function Day({ day, selected }: { day: ExerciseDay; selected: boolean }): JSX.Element {
    return (<div className={'Day' + (selected ? ' selected' : '')}>
                <strong className="full-center">{day.date}</strong>
                {(orderExercisesInObject(day.exercises)).map(ex => {
                    const { series } = day.exercises[ex]!;

                    return (<div key={ex} className="Day__exercise">
                        <span>{exerciseShortName[ex]} ({day.rep_goal})</span>
                        <div>{series.map((s, i) => <span key={i}>
                                {s === day.rep_goal ? checkMark : failMark}
                            </span>)}
                        </div>
                    </div>);
                })}
        </div>);
}
export default Day;
