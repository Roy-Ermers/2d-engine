import Color from './Color';
import Vector2 from './Data/Vector2';

export type Shape = {
    offset: Vector2,
    color: Color;
} & ({
    type: "box",
    size?: Vector2 | number;
} | {
    type: "circle",
    width: number,
    arc?: [number, number];
} | {
    type: "polygon",
    indices: Vector2[];
});
