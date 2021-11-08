import Color from './Color';
export type Position = [number, number];
export type Shape = {
    position: [number, number],
    color: Color;
} & ({
    type: "box",
    size?: [number, number] | number;
} | {
    type: "circle",
    width: number,
    arc?: [number, number];
} | {
    type: "polygon",
    indices: [number, number][];
});
