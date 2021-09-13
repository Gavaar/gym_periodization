export default function stringToDate(string: string): Date {
    const [day, month, year] = string.split('-');
    return new Date(+year, +month - 1, +day);
}
