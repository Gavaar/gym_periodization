import { ExerciseBlock } from "../block.model";
import blockWeekBuilder from "./block-week-builder";
import ExerciseByWeek from "./week/week";

function BlockBody({ block }: { block: ExerciseBlock }) {
    const blockWeeks = blockWeekBuilder(block);

    return (<div>
            {blockWeeks.map(({ exerciseName, weekSuccess, modifier, weight, key }) => {
                return <ExerciseByWeek key={key} exerciseName={exerciseName} modifier={modifier} weight={weight} weekSuccess={weekSuccess} /> 
            })}
        </div>);
}
export default BlockBody;
