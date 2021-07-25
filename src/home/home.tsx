import './home.css';
import DecreasingNumberButton from '__components__/decreasing-number-button/decreasing-number-button';
import { useState } from 'react';

const exerciseState: { [ex: string]: { medianWeight: number; series: number[]; } } = {
    squat: {
        medianWeight: 97.5,
        series: [0, 0, 0, 0, 0],
    },
    bench_press: {
        medianWeight: 72.5,
        series: [0, 0, 0, 0, 0],
    },
    deadlift: {
        medianWeight: 110,
        series: [0],
    },
    barbell_row: {
        medianWeight: 72.5,
        series: [0, 0, 0, 0, 0],
    },
    overhead_press: {
        medianWeight: 55,
        series: [0, 0, 0, 0, 0],
    },
};

const snakeToTitle = (snake: string) => {
    return snake
        .split('_')
        .map(word => {
            const letters = word.split('');
            letters[0] = letters[0].toUpperCase();
            return letters.join('');
        })
        .join(' ');
};

function Home() {
    const [state, setState] = useState(exerciseState);

    return (
        <section className="GymPeriodizator">
            <h1 className="full-center">Gym Periodization</h1>
            {
                Object.keys(state).map(key => {
                    const { medianWeight, series } = state[key];
                    return (<div>
                        <h3>{ snakeToTitle(key) } (5x5 { medianWeight }Kg)</h3>
                        <div className="GymPeriodizator_exercise">
                            { series.map(reps => <DecreasingNumberButton maxValue={6} />) }
                        </div>
                    </div>);
                })
            }
        </section>
    );
}
export default Home;