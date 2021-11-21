import Game from 'Engine';

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

export function generateId(size = 8) {
    let id = '';
    let bytes = crypto.getRandomValues(new Uint8Array(size));

    while (size--) {
        let byte = bytes[size] & 63;
        if (byte < 36) {
            // `0-9a-z`
            id += byte.toString(36);
        } else if (byte < 62) {
            // `A-Z`
            id += (byte - 26).toString(36).toUpperCase();
        } else if (byte < 63) {
            id += '#';
        } else {
            id += '$';
        }
    }
    return id;
}