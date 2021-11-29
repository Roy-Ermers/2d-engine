import { DEGREE_TO_RADIAL, lerp } from '@/Helpers';

export default class Vector2 {

    static zero = new Vector2(0, 0);
    static one = new Vector2(1, 1);

    static up = new Vector2(0, -1);
    static down = new Vector2(0, 1);

    static left = new Vector2(-1, 0);
    static right = new Vector2(1, 0);

    static get random() {
        return new Vector2(
            Math.random(),
            Math.random()
        );
    }

    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }


    constructor(public x: number = 0, public y: number = 0) { }

    lerp(target: Vector2, amount: number) {
        return new Vector2(
            lerp(this.x, target.x, amount),
            lerp(this.y, target.y, amount)
        );
    }

    dot(test: Vector2) {
        return (this.x * test.x) + (this.y * test.y);
    }

    distance(goal: Vector2) {
        return Math.sqrt(
            (goal.x - this.x) ** 2
            +
            (goal.y - this.y) ** 2
        );
    }

    angle(target: Vector2) {
        return Math.atan2(target.y - this.y, target.x - this.x);
    }

    invert() {
        return this.multiply(-1);
    }

    rotate(degrees: number) {
        const radials = degrees * DEGREE_TO_RADIAL;

        return new Vector2(
            this.x * Math.cos(radials) - this.y * Math.sin(radials),
            this.x * Math.sin(radials) + this.y * Math.cos(radials),
        );
    }

    normalize() {
        if (this.length == 0)
            return this;
        return this.divide(this.length);
    }

    limit(limit: number = 1) {
        return new Vector2(
            Math.min(Math.abs(this.x), limit) * Math.sign(this.x),
            Math.min(Math.abs(this.y), limit) * Math.sign(this.y)
        );
    }

    multiply(x: number): Vector2;
    multiply(x: number, y: number): Vector2;
    multiply(vector: Vector2): Vector2;
    multiply(vector: number | Vector2, y?: number) {
        if (vector instanceof Vector2)
            return new Vector2(
                this.x * vector.x,
                this.y * vector.y
            );

        return new Vector2(
            this.x * vector,
            this.y * (y ?? vector)
        );
    }

    divide(x: number): Vector2;
    divide(x: number, y: number): Vector2;
    divide(vector: Vector2): Vector2;
    divide(vector: number | Vector2, y?: number) {
        if (vector instanceof Vector2)
            return new Vector2(
                this.x / vector.x,
                this.y / vector.y
            );

        return new Vector2(
            this.x / vector,
            this.y / (y ?? vector)
        );
    }

    add(x: number): Vector2;
    add(x: number, y: number): Vector2;
    add(vector: Vector2): Vector2;
    add(vector: number | Vector2, y?: number) {
        if (vector instanceof Vector2)
            return new Vector2(
                this.x + vector.x,
                this.y + vector.y
            );

        return new Vector2(
            this.x + vector,
            this.y + (y ?? vector)
        );
    }

    minus(x: number): Vector2;
    minus(x: number, y: number): Vector2;
    minus(vector: Vector2): Vector2;
    minus(vector: number | Vector2, y?: number) {
        if (vector instanceof Vector2)
            return new Vector2(
                this.x - vector.x,
                this.y - vector.y
            );

        return new Vector2(
            this.x - vector,
            this.y - (y ?? vector)
        );
    }

    static fromAngle(angle: number) {
        const radians = angle * DEGREE_TO_RADIAL;
        return new Vector2(
            Math.sin(radians),
            -Math.cos(radians)
        );
    }

    copy() {
        return new Vector2(
            this.x,
            this.y
        );
    }

    toString() {
        return `(${Math.round(this.x * 100) / 100}, ${Math.round(this.y * 100) / 100})`;
    }
}