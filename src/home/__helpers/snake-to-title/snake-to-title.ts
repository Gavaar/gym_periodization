export default function snakeToTitle(snake: string) {
    return snake
        .split('_')
        .map(word => {
            const letters = word.split('');
            letters[0] = letters[0].toUpperCase();
            return letters.join('');
        })
        .join(' ');
};
