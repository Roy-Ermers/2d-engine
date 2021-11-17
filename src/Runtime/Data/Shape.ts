import Color from '@/Color';
import Vector2 from '@/Data/Vector2';

export type Shape = {
    offset: Vector2,
    rotation: number,
    color: Color;
} & ({
    type: "box",
    size?: Vector2 | number;
} | {
    type: "circle",
    size: number,
    arc?: [number, number];
} | {
    type: "polygon",
    indices: Vector2[];
});
