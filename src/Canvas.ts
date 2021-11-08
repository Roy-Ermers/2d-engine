import Color from './Color.js';
import { DEGREE_TO_RADIAL } from './Helpers.js';
import { Position } from './Shape.js';

export default class Canvas {

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private _background?: Color;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;
        // this._background = new Color(0, 0, 0);

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", () => this.resize());
        this.resize();
    }

    background(color: Color | String) {
        if (typeof color == "string")
            this._background = Color.fromString(color);
        else if (color instanceof Color)
            this._background = color;
    }

    circle(position: Position, width: number, color: Color, arc: [number, number] = [0, Math.PI * 2]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.fillStyle = color.toString();

        this.ctx.arc(position[0], position[1], width, arc[0], arc[1]);
        this.ctx.fill();
        this.ctx.closePath();
    }

    box(position: Position, color: Color, size: number): void;
    box(position: Position, color: Color, size: [number, number]): void;
    box(position: Position, color: Color, size: [number, number] | number = [1, 1]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.fillStyle = color.toString();

        const width = typeof size == "number" ? size : size[0];
        const height = typeof size == "number" ? size : size[1];
        this.ctx.fillRect(position[0], position[1], width, height);
        this.ctx.closePath();
    }

    polygon(position: Position, color: Color, indices: Position[]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color.toString();
        this.ctx.moveTo(position[0], position[1]);

        for (const index of indices) {
            this.ctx.lineTo(position[0] + index[0], position[1] + index[1]);
        }

        this.ctx.stroke();
        this.ctx.closePath();
    }

    arc(offset: number, width: number = 90, rotation: number = 0, thickness: number = 16, color: Color = Color.white) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = thickness;
        this.ctx.strokeStyle = color.toString();


        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, offset, (rotation - width / 2) * DEGREE_TO_RADIAL, (rotation + width / 2) * DEGREE_TO_RADIAL);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    text(string: string, x: number = 0, y: number = 0, color: Color = Color.black, size: number = 16) {
        console.log(color.toString());
        this.ctx.strokeStyle = color.toString();
        this.ctx.fillStyle = color.toString();
        this.ctx.font = `${size}px sans-serif`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(string, x, y);
    }

    draw() {
        if (this._background)
            this.ctx.fillStyle = this._background.toString();
        else this.ctx.fillStyle = Color.white.toString();

        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}