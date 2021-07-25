import { cleanup, fireEvent, render } from '@testing-library/react';
import DecreasingNumberButton from './decreasing-number-button';

describe('DecreasingNumberButton', () => {
    describe('default rendering of button', () => {
        let button: HTMLElement;
    
        beforeEach(() => button = render(<DecreasingNumberButton />).getByRole('button'));
        afterEach(() => cleanup());
    
        test('default button is empty', () => {
            expect(button).toBeEmptyDOMElement();
            expect(button).not.toHaveTextContent(/[0-9]/i);
        });
    
        test('clicking returns default value of 5', () => {
            fireEvent.click(button);
            expect(button).toHaveTextContent('5');
        });
    
        test('multiple clicks reduce the value further', () => {
            [5,4,3,2].forEach(_ => fireEvent.click(button));
            expect(button).toHaveTextContent('2');
        });
    
        test('clicking after 0 gets null', () => {
            [5,4,3,2,1,0, null].forEach(_ => fireEvent.click(button));
            expect(button).toBeEmptyDOMElement();
        });
    });
    
    describe('button can have custom maximum value', () => {
        let button: HTMLElement;
    
        beforeEach(() => button = render(<DecreasingNumberButton maxValue={2} />).getByRole('button'));
        afterEach(() => cleanup());
    
        test('default button is empty', () => {
            expect(button).toBeEmptyDOMElement();
            expect(button).not.toHaveTextContent(/[0-9]/i);
        });
    
        test('clicking returns default value of 2', () => {
            fireEvent.click(button);
            expect(button).toHaveTextContent('2');
        });
    });
    
    describe('custom value should be higher than 0', () => {
        let button: HTMLElement;
    
        beforeEach(() => button = render(<DecreasingNumberButton maxValue={-3} />).getByRole('button'));
        afterEach(() => cleanup());
    
        test('default button is empty', () => {
            expect(button).toBeEmptyDOMElement();
            expect(button).not.toHaveTextContent(/[0-9]/i);
        });
    
        test('clicking returns default value of 0', () => {
            fireEvent.click(button);
            expect(button).toHaveTextContent('0');
        });
    });    
});