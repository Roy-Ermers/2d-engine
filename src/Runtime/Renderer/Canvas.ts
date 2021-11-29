import Tilemap, { Tile } from '@/Assets/Tilemap';
import Vector2 from '@/Data/Vector2';
import Camera from '@/Renderer/Camera';
import Color from '@/Renderer/Color';
import { DEGREE_TO_RADIAL } from '@/Helpers';
import { Shape } from '@/Renderer/Shape';
import Game from 'Engine';

export default class Canvas {
    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    get middle() {
        return this._size.divide(2);
    }

    get size() {
        return this._size;
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
    private _size: Vector2 = Vector2.one;

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
            document.body.requestFullscreen();
        });

        this.resize();
    }

    circle(worldPosition: Vector2, rotation: number, size: number, color: Color, arc: [number, number] = [0, 360]) {
        const position = Camera.worldToCameraSpace(worldPosition);
        const localRotation = rotation + Camera.rotation;

        this.ctx.beginPath();
        this.ctx.fillStyle = color.toString();

        this.ctx.arc(position.x, position.y, size / 2 * Camera.zoom, (arc[0] + localRotation) * DEGREE_TO_RADIAL, arc[1] + localRotation * DEGREE_TO_RADIAL);
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

    private tracePolygon(worldPosition: Vector2, rotation: number, color: Color, indices: Vector2[]) {
        if (indices.length < 2)
            return;
        this.ctx.beginPath();

        const [start, ...points] = indices;
        const position = Camera.worldToCameraSpace(worldPosition.add(start.rotate(rotation)));
        this.ctx.moveTo(Math.floor(position.x), Math.floor(position.y));

        for (const index of points) {
            const next = Camera.worldToCameraSpace(worldPosition.add(index.rotate(rotation)));
            this.ctx.lineTo(next.x, next.y);
        }

        this.ctx.lineTo(Math.floor(position.x), Math.floor(position.y));
        this.ctx.closePath();
    }

    polygon(worldPosition: Vector2, rotation: number, color: Color, indices: Vector2[]) {
        this.tracePolygon(worldPosition, rotation, color, indices);
        this.ctx.fillStyle = color.toString();
        this.ctx.fill();
    }

    wirePolygon(worldPosition: Vector2, rotation: number, color: Color, indices: Vector2[]) {
        this.tracePolygon(worldPosition, rotation, color, indices);
        this.ctx.strokeStyle = color.toString();
        this.ctx.stroke();
    }


    arc(offset: number, width: number = 90, rotation: number = 0, thickness: number = 16, color: Color = Color.white) {
        this.ctx.beginPath();
        this.ctx.lineWidth = thickness;
        this.ctx.strokeStyle = color.toString();


        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, offset, (rotation - width / 2) * DEGREE_TO_RADIAL, (rotation + width / 2) * DEGREE_TO_RADIAL);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    text(screenPosition: Vector2, rotation: number, string: string, color: Color = Color.black, size: number = 16) {
        this.ctx.font = `${size}px sans-serif`;
        const position = screenPosition;

        this.ctx.strokeStyle = color.toString();
        this.ctx.fillStyle = color.toString();

        const lines = string.split('\n');
        let i = 0;

        for (const line of lines) {
            i += size * 1.5;
            this.ctx.fillText(line.replaceAll(/\t/g, '    '), position.x, position.y + i);
        }
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

    drawShape(worldPosition: Vector2, localRotation: number, shape: Shape) {
        console.assert(shape !== undefined, "shape is undefined", shape);

        const { color, offset } = shape;
        const shapeRotation = (shape.rotation ?? 0) + localRotation;
        const localPosition = offset.rotate(localRotation).add(worldPosition);

        switch (shape.type) {
            case "box":
                if (typeof shape.size == "number")
                    this.box(localPosition, shapeRotation, color, shape.size);
                else if (shape.size instanceof Vector2)
                    this.box(localPosition, shapeRotation, color, shape.size);
                break;
            case "circle":
                this.circle(localPosition, shapeRotation, shape.size, color, shape.arc);
                break;
            case "polygon":
                this.polygon(localPosition, shapeRotation, color, shape.indices);
                break;
        }
    }

    drawTile(worldPosition: Vector2, worldRotation: number, tileMap: Tilemap, tile: string | number | Tile) {
        const info = typeof tile == "object" ? tile : tileMap.getTile(tile);

        this.ctx.fillStyle = Color.red.toString();

        const position = Camera.worldToCameraSpace(worldPosition);
        const size = tileMap.magnitude * Camera.zoom;

        this.ctx.translate(position.x, position.y);
        this.ctx.rotate((worldRotation + Camera.rotation) * DEGREE_TO_RADIAL);

        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(tileMap.image!,
            info.x,
            info.y,
            info.width,
            info.height,
            info.width * size * -.5,
            info.width * size * -.5,
            info.width * size,
            info.height * size
        );
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    draw() {
        this.ctx.fillStyle = this.background.toString();

        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._size = new Vector2(this.canvas.width, this.canvas.height);
    }
}