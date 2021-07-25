import React from 'react';
import './decreasing-number-button.css';

interface DecreasingNumberConfig {
    maxValue?: number;
}

function propsMustHavePositiveMaxValue(props: DecreasingNumberConfig) {
    const _props = { ...props };
    if (!_props.maxValue) {
        _props.maxValue = 5;
    }
    if (_props.maxValue < 0) {
        _props.maxValue = 0;
    }
    return _props;
}

class DecreasingNumberButton extends React.Component<DecreasingNumberConfig, { value?: number }> {
    private maxValue?: number;

    constructor(config: DecreasingNumberConfig) {
        super(config);
        this.state = {};
        this.maxValue = propsMustHavePositiveMaxValue(config).maxValue;
    }

    buttonClick(): void {
        const newValue = this.nextButtonValue(this.state.value);
        this.setState({ value: newValue });
    }

    render() {
        return (
            <button className="RoundButton"
                onClick={() => this.buttonClick()}>
                { this.state.value != null ? this.state.value : '' }
            </button>
        );
    }

    private nextButtonValue(previousValue?: number): number | undefined {
        if (previousValue == null) {
            return this.maxValue;
        } else if (!previousValue) {
            return;
        }
        return previousValue - 1;
    }
}
export default DecreasingNumberButton;