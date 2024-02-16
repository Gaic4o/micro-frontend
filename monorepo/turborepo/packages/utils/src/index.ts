export function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

export function findMax(numbers: number[]): number {
    return Math.max(...numbers);
}
