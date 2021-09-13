export default function dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.substr(-2);
    const day = `0${date.getDate()}`.substr(-2);
    return `${day}-${month}-${year}`;
}
