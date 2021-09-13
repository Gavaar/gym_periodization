import './home.css';
import { DaysContext } from './days/days.context';
import { BlocksContext } from './blocks/blocks.context';
import { SelectedBlock } from './__states';
import { SelectedDay } from './__states';
import SelectedExerciseDay from './exercise-day/exercise-day';
import Blocks from './blocks/blocks';
import Days from './days/days';
import Profile from './profile/profile';
import UserConfig from './user-config/user-config';
import { UserContext } from './user/user.context';
import { AuthContext } from './auth/auth.context';

const VERSION = '0.1.8';

function Home(): JSX.Element {
    return (
        <AuthContext>
        <UserContext>
        <BlocksContext>
        <SelectedBlock>
        <DaysContext>
        <SelectedDay>
            <section className="GymPeriodizator">
                <h1 className="GymPeriodizator__title full-center">
                    <Profile />
                    <span>Periodization v.{VERSION}</span>
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
        </UserContext>
        </AuthContext>
    );
}
export default Home;
