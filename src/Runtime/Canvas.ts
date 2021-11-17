import Tilemap, { Tile } from '@/Assets/Tilemap';
import Vector2 from '@/Data/Vector2';
import Camera from '@/Camera';
import Color from '@/Color';
import { DEGREE_TO_RADIAL } from '@/Helpers';
import { Shape } from '@/Data/Shape';

export default class Canvas {
    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    get middle() {
        return new Vector2(
            this.canvas.width / 2,
            this.canvas.height / 2
        );
    }

    get size() {
        return new Vector2(
            this.canvas.width,
            this.canvas.height
        );
    }

    get element() {
        return this.canvas;
    }

    set background(color: Color) {
        this._background = color;
    }

    get background() {
        return this._background ?? Color.white;
    }

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private _background?: Color;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;

        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.textBaseline = "middle";

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", () => this.resize());
        this.canvas.addEventListener("click", () => {
            console.log("requesting fullscreen");
            this.canvas.requestFullscreen();
        });

        this.resize();
    }

    rotate(angle: number) {
        // this.ctx.translate(this.middle.x, this.middle.y);
        // // this.ctx.rotate(angle * DEGREE_TO_RADIAL);
        // this.ctx.translate(-this.middle.x, -this.middle.y);
    }

    circle(worldPosition: Vector2, rotation: number, width: number, color: Color, arc: [number, number] = [0, 360]) {
        const position = Camera.worldToCameraSpace(worldPosition);

        this.ctx.beginPath();
        this.ctx.fillStyle = color.toString();

        this.ctx.arc(position.x, position.y, width / 2 * Camera.zoom, ((arc[0] + rotation) % 360) * DEGREE_TO_RADIAL, (arc[1] + rotation % 360) * DEGREE_TO_RADIAL);
        this.ctx.fill();
        this.ctx.closePath();
    }

    box(worldPosition: Vector2, worldRotation: number, color: Color, size: number): void;
    box(worldPosition: Vector2, worldRotation: number, color: Color, size: Vector2): void;
    box(worldPosition: Vector2, worldRotation: number, color: Color, size: Vector2 | number = Vector2.one) {
        const width = typeof size == "number" ? size : size.x;
        const height = typeof size == "number" ? size : size.y;

        this.polygon(worldPosition, worldRotation, color, [
            new Vector2(-width / 2, -height / 2),
            new Vector2(-width / 2, height / 2),
            new Vector2(width / 2, height / 2),
            new Vector2(width / 2, -height / 2),
            new Vector2(-width / 2, -height / 2)
        ]);

        this.ctx.closePath();
    }

    polygon(worldPosition: Vector2, rotation: number, color: Color, indices: Vector2[]) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color.toString();

        const [start, ...points] = indices;
        const position = Camera.worldToCameraSpace(worldPosition.add(start.rotate(rotation)));
        this.ctx.moveTo(Math.floor(position.x), Math.floor(position.y));

        for (const index of points) {
            const next = Camera.worldToCameraSpace(worldPosition.add(index.rotate(rotation)));
            this.ctx.lineTo(next.x, next.y);
        }

        this.ctx.fill();
        this.ctx.closePath();
    }

    arc(offset: number, width: number = 90, rotation: number = 0, thickness: number = 16, color: Color = Color.white) {
        this.ctx.beginPath();
        this.ctx.lineWidth = thickness;
        this.ctx.strokeStyle = color.toString();


        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, offset, (rotation - width / 2) * DEGREE_TO_RADIAL, (rotation + width / 2) * DEGREE_TO_RADIAL);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    text(worldPosition: Vector2, worldRotation: number, string: string, color: Color = Color.black, size: number = 16) {
        const position = Camera.worldToCameraSpace(worldPosition);
        this.ctx.font = `${size}px sans-serif`;

        this.ctx.strokeStyle = color.toString();
        this.ctx.fillStyle = color.toString();

        this.ctx.fillText(string, position.x, position.y);
    }

    vector(worldPosition: Vector2, worldRotation: number, vector: Vector2, color: Color = Color.green) {
        const position = Camera.worldToCameraSpace(worldPosition);
        const end = Camera.worldToCameraSpace(worldPosition.add(vector));

        const delta = end.minus(position);

        if (delta.length == 0)
            return;

        const headlen = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.3; // length of head in pixels
        const angle = Math.atan2(delta.y, delta.x);
        this.ctx.beginPath();
        this.ctx.strokeStyle = color.toString();
        this.ctx.moveTo(position.x, position.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(end.x - headlen * Math.cos(angle - Math.PI / 4), end.y - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(end.x, end.y);
        this.ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 4), end.y - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    drawShape(position: Vector2, rotation: number, shape: Shape) {
        console.assert(shape !== undefined, "shape is undefined", shape);
        const { color, offset } = shape;
        const localPosition = position.add(offset).rotate(rotation);
        const localRotation = rotation + (shape.rotation ?? 0);

        switch (shape.type) {
            case "box":
                if (typeof shape.size == "number")
                    this.box(localPosition, localRotation, color, shape.size);
                else if (shape.size instanceof Vector2)
                    this.box(localPosition, localRotation, color, shape.size);
                break;
            case "circle":
                this.circle(localPosition, localRotation, shape.size, color, shape.arc);
                break;
            case "polygon":
                this.polygon(localPosition, localRotation, color, shape.indices);
                break;
        }
    }

    drawTile(worldPosition: Vector2, worldRotation: number, tileMap: Tilemap, tile: string | number | Tile) {
        const position = Camera.worldToCameraSpace(worldPosition);

        const info = typeof tile == "object" ? tile : tileMap.getTile(tile);

        const size = tileMap.magnitude * Camera.zoom;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(tileMap.image!, info.x, info.y, info.width, info.height, position.x, position.y, info.width * size, info.height * size);
        this.ctx.imageSmoothingEnabled = true;
    }

    draw() {
        this.ctx.fillStyle = this.background.toString();

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}