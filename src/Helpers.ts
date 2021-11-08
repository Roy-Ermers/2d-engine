import Game from './Game';

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