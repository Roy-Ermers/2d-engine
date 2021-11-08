import { lerp } from './Helpers.js';

export default class Color {

    static red = new Color(255, 0, 0);
    static blue = new Color(0, 255, 0);
    static green = new Color(0, 0, 255);
    static black = new Color(0, 0, 0, 1);
    static white = new Color(255, 255, 255);

    static random() {
        return new Color(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255), 1);
    }

    r: number = 255;
    g: number = 255;
    b: number = 255;
    a: number = 1;

    /**
     * @param {number} [r]
     * @param {number} [g]
     * @param {number} [b]
     * @param {number} [a]
     */
    constructor(r: number, g: number, b: number, a?: number) {
        this.r = r ?? 0;
        this.g = g ?? 0;
        this.b = b ?? 0;
        this.a = a ?? 1;
    }

    lerp(target: Color, amount: number) {
        return new Color(
            Math.round(lerp(this.r, target.r, amount)),
            Math.round(lerp(this.g, target.g, amount)),
            Math.round(lerp(this.b, target.g, amount))
        );
    }

    invert() {
        return new Color(255 - this.r, 255 - this.g, 255 - this.b);
    }

    /**
     * @param {number} factor
     */
    shade(factor: number) {
        return new Color(
            Math.floor(this.r * (1 - factor)),
            Math.floor(this.g * (1 - factor)),
            Math.floor(this.b * (1 - factor))
        );
    }

    /**
     * @param {string} string
     */
    static fromString(string: string) {
        if (!string.startsWith("#"))
            throw new Error("Color.fromString expects a string in the `#RRGGBB(AA)?` format.");

        const parts = string.substring(1).split('');
        const result = new Color(
            parseInt(parts[0] + parts[1], 16),
            parseInt(parts[2] + parts[3], 16),
            parseInt(parts[4] + parts[5], 16)
        );

        if (parts.length == 8)
            result.a = parseInt(parts[6] + parts[7], 16);

        return result;
    }

    toString() {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${(this.a * 255).toString(16).padStart(2, '0')}`;
    }
}