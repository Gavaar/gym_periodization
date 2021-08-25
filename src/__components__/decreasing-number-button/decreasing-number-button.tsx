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
function nextButtonValue(previousValue?: number, maxValue?: number): number | undefined {
    if (previousValue == null) {
        return maxValue;
    } else if (!previousValue) {
        return;
    }
    return previousValue - 1;
}

function DecreasingNumberButton({ onChange, value, maxValue: max }: DecreasingNumberProps) {
    const maxValue = maxValueMustBePositive(max);

    function buttonClick(): void {
        const newValue = nextButtonValue(value, maxValue);
        if (onChange) {
            onChange(newValue);
        }
    }

    return (
        <button className="RoundButton"
            onClick={() => buttonClick()}>
            {value}
        </button>
    );
}
export default DecreasingNumberButton;
