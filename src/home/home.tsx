import './home.css';
import { HomeContext } from './__states';
import { DaysContext } from './days/days.context';
import { BlocksContext } from './blocks/blocks.context';
import { SelectedBlock } from './__states';
import { SelectedDay } from './__states';
import SelectedExerciseDay from './selected-exercise-day/selected-exercise-day';
import Blocks from './blocks/blocks';
import Days from './days/days';
import { useEffect, useState } from 'react';
import Store from './__helpers/store/store';

const COLORS: { [color: string]: string } = {
    red: '#ce1c1c',
    green: '#18ab53',
    blue: '#1c37ce',
}

function Home(): JSX.Element {
    const root = document.documentElement;
    const colors = Object.keys(COLORS);
    const userStore = new Store<{ id: number; color: string }>('users');
    const [color, setColor] = useState(userStore.get(1)?.color || COLORS.red);

    useEffect(() => {
        root.style.setProperty('--main', color);
        root.style.setProperty('--main-light', `${color}a8`);
        userStore.update(1, { id: 1, color });
        // eslint-disable-next-line
    }, [color, root.style]);

    return (
        <HomeContext>
        <BlocksContext>
        <SelectedBlock>
        <DaysContext>
        <SelectedDay>
            <section className="GymPeriodizator">
                <h1 className="GymPeriodizator__title full-center">
                    Gym Periodization
                    {colors.map(col => {
                        const hexColor = COLORS[col];
                        const appendClass = hexColor === color ? ' selected' : ' ';

                        return (<div
                            key={col}
                            className={'GymPeriodizator__btn ' + col + appendClass}
                            onClick={() => setColor(hexColor)}>
                        </div>);
                    })}
                    {/* <div className="GymPeriodizator__btn red" onClick={() => setColor(Colors.Red)}></div>
                    <div className="GymPeriodizator__btn green" onClick={() => setColor(Colors.Green)}></div>
                    <div className="GymPeriodizator__btn blue" onClick={() => setColor(Colors.Blue)}></div> */}
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
