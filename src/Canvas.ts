import Color from './Color.js';
import Vector2 from './Data/Vector2';
import { DEGREE_TO_RADIAL } from './Helpers.js';
import { Shape } from './Shape';

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

    circle(position: Vector2, width: number, color: Color, arc: [number, number] = [0, Math.PI * 2]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.fillStyle = color.toString();

        this.ctx.arc(position.x, position.y, width, arc[0], arc[1]);
        this.ctx.fill();
        this.ctx.closePath();
    }

    box(position: Vector2, color: Color, size: number): void;
    box(position: Vector2, color: Color, size: Vector2): void;
    box(position: Vector2, color: Color, size: Vector2 | number = Vector2.one) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.fillStyle = color.toString();

        const width = typeof size == "number" ? size : size.x;
        const height = typeof size == "number" ? size : size.y;
        this.ctx.fillRect(position.x, position.y, width, height);
        this.ctx.closePath();
    }

    polygon(position: Vector2, color: Color, indices: Vector2[]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color.toString();
        this.ctx.moveTo(position.x, position.y);

        for (const index of indices) {
            this.ctx.lineTo(position.x + index.x, position.y + index.y);
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
        this.ctx.strokeStyle = color.toString();
        this.ctx.fillStyle = color.toString();
        this.ctx.font = `${size}px sans-serif`;
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(string, x, y);
    }

    drawShape(origin: Vector2, shape: Shape) {
        console.assert(shape !== undefined, "shape is undefined", shape);
        const { color } = shape;
        const position = shape.offset.add(origin);

        switch (shape.type) {
            case "box":
                if (typeof shape.size == "number")
                    this.box(position, color, shape.size);
                else if (shape.size instanceof Vector2)
                    this.box(position, color, shape.size);
                break;
            case "circle":
                this.circle(position, shape.width, color, shape.arc);
                break;
            case "polygon":
                this.polygon(position, color, shape.indices);
                break;
        }
    }

    draw() {
        this.ctx.fillStyle = (this._background ?? Color.white).toString();

        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}