import './exercise-set.css';
import { useDayBody } from './exercise-set.state';
import { useVolume } from './exercise-set-footer/volume/volume.state';
import { ExerciseSetHeader } from './exercise-set-header';
import ExerciseSetFooter from './exercise-set-footer/exercise-set-footer';
import ExerciseSetBody from './exercise-set-body/exercise-set-body';
import { useExerciseBody } from './exercise-set-body/exercise-set-body.state';

export default function ExerciseSet(): JSX.Element {
    const [exerciseBody] = useExerciseBody();
    const [dayBody, setDayBody] = useDayBody(exerciseBody);
    const [volume] = useVolume(dayBody, exerciseBody);

    return (<article className="ExerciseSet">
        <hr className="delimiter" />
        <ExerciseSetHeader dayBodyState={[dayBody]}/>

        <ExerciseSetBody dayBodyState={[dayBody, setDayBody]}
            volumeState={[volume]}
            exerciseBody={exerciseBody}/>

        <ExerciseSetFooter dayBodyState={[dayBody, setDayBody]}
            volumeState={[volume]}/>
    </article>);
}
