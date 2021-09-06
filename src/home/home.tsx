import './home.css';
import { HomeContext } from './__states';
import { DaysContext } from './days/days.context';
import { BlocksContext } from './blocks/blocks.context';
import { SelectedBlock } from './__states';
import { SelectedDay } from './__states';
import SelectedExerciseDay from './selected-exercise-day/selected-exercise-day';
import Blocks from './blocks/blocks';
import Days from './days/days';
import Profile from './profile/profile';
import UserConfig from './user-config/user-config';

const VERSION = '0.1.2';

function Home(): JSX.Element {
    return (
        <HomeContext>
        <BlocksContext>
        <SelectedBlock>
        <DaysContext>
        <SelectedDay>
            <section className="GymPeriodizator">
                <h1 className="GymPeriodizator__title full-center">
                    <Profile />
                    <span>Gym Periodization v.{VERSION}</span>
                    <UserConfig />
                </h1>
                <div className="GymPeriodizator__body">
                    <SelectedExerciseDay />
                    <Blocks />
                </div>
                <div className="GymPeriodizator__day-picker">
                    <Days />
                </div>
            </section>
        </SelectedDay>
        </DaysContext>
        </SelectedBlock>
        </BlocksContext>
        </HomeContext>
    );
}
export default Home;
