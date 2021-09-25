import './home.css';
import Blocks from './blocks/blocks';
import Days from './days/days';
import Profile from './profile/profile';
import UserConfig from './user-config/user-config';
import ExerciseSet from './exercise-set/exercise-set';
import { AuthContext } from './auth/auth.context';
import { UserContext } from './user/user.context';
import { BlocksContext } from './blocks/blocks.context';
import { SelectedBlockId } from './blocks/selected-block-id';
import { DaysContext } from './days/days.context';
import { SelectedDayId } from './days/selected-day-id';
import { DayContext } from './days/day/day.context';
import { BlockContext } from './blocks/block/block.context';

const VERSION = '0.1.10';

function Home(): JSX.Element {
    return (
        <AuthContext>
        <UserContext>
        <BlocksContext>
        <SelectedBlockId>
        <BlockContext>
        <DaysContext>
        <SelectedDayId>
        <DayContext>
        <section className="GymPeriodizator">
            <h1 className="GymPeriodizator__title full-center">
                <Profile />
                <span>Periodization v.{VERSION}</span>
                <UserConfig />
            </h1>
            <div className="GymPeriodizator__body">
                <ExerciseSet />
                <Blocks />
            </div>
            <div className="GymPeriodizator__day-picker">
                <Days />
            </div>
        </section>
        </DayContext>
        </SelectedDayId>
        </DaysContext>
        </BlockContext>
        </SelectedBlockId>
        </BlocksContext>
        </UserContext>
        </AuthContext>
    );
}
export default Home;
