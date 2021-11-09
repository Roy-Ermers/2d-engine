import { lerp } from '../Helpers';

export default class Vector2 {

    static zero = new Vector2(0, 0);
    static one = new Vector2(1, 1);

    static up = new Vector2(0, -1);
    static down = new Vector2(0, 1);

    static left = new Vector2(-1, 0);
    static right = new Vector2(1, 0);

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

    invert() {
        return this.multiply(-1);
    }

    normalize() {
        return this.divide(this.length);
    }

    limit(limit: number = 1) {
        return new Vector2(
            Math.min(Math.abs(this.x), limit) * Math.sign(this.x),
            Math.min(Math.abs(this.y), limit) * Math.sign(this.y)
        );
    }

    multiply(x: number): Vector2;
    multiply(x: number, u: number): Vector2;
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

    toString() {
        return `(${Math.round(this.x * 100) / 100}, ${Math.round(this.y * 100) / 100})`;
    }
}