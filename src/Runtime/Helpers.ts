import Game from 'game';

/**
 * @param {number} start
 * @param {number} end
 * @param {number} amt
 */
export function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
}

export const DEGREE_TO_RADIAL = Math.PI / 180;

export function every(miliseconds: number, precision = 10) {
    return Math.floor(Game.time / precision) * precision % miliseconds == 0;
}

export function structuredClone(object: any): any {
    if (typeof object != "object")
        return object;

    if (typeof object.copy == "function")
        return object.copy();

    if (Array.isArray(object))
        return [...object.map(structuredClone)];

    const entries = Object.entries(object);
    let result: Record<string | number, any> = {};

    for (const [key, value] of entries) {
        result[key] = structuredClone(value);
    }

    return result;
}