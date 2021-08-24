import './decreasing-number-button.css';

interface DecreasingNumberProps {
    maxValue?: number;
    value?: number;
    onChange?: (newValue?: number) => void;
}

function maxValueMustBePositive(maxValue: number | undefined) {
    if (maxValue == null) {
        return 5;
    }
    if (maxValue < 0) {
        return 0;
    }
    return maxValue;
}

function DecreasingNumberButton({ onChange, value, maxValue: max }: DecreasingNumberProps) {
    const maxValue = maxValueMustBePositive(max);

    const buttonClick = (): void => {
        const newValue = nextButtonValue(value);
        if (onChange) {
            onChange(newValue);
        }
    }

    const nextButtonValue = (previousValue?: number): number | undefined => {
        if (previousValue == null) {
            return maxValue;
        } else if (!previousValue) {
            return;
        }
        return previousValue - 1;
    }

    return (
        <button className="RoundButton"
            onClick={() => buttonClick()}>
            {value}
        </button>
    );
}
export default DecreasingNumberButton;
