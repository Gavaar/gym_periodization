import '@testing-library/react';
import snakeToTitle from './snake-to-title';

describe('snakeToTitle', () => {
    test('properly transforms a snake name to Title case', () => {
        expect(snakeToTitle('this_is_snake_case_test')).toBe('This Is Snake Case Test');
    });

    test('non snake returns same value', () => {
        expect(snakeToTitle('this is a test non snake text')).toBe('This is a test non snake text');
    });
});
