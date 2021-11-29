import Vector2 from '@/Data/Vector2';
import Game from './Game';

export default class Mouse {
    private static _x: number = 0;
    private static _y: number = 0;
    private static _wheel: number = 0;
    private static mouseButtons: {
        left: boolean,
        right: boolean,
        middle: boolean;
    } = { left: false, right: false, middle: false };

    public static get x() {
        return this._x;
    }

    public static get y() {
        return this._y;
    }

    public static get wheel() {
        return this._wheel;
    }

    public static get position() {
        return new Vector2(
            this._x,
            this._y
        );
    }

    public static set visible(value) {
        Game.canvas.element.style.cursor = value ? 'default' : 'none';
    }

    public static get visible() {
        return Game.canvas.element.style.cursor == 'default';
    }

    public static get left() {
        return this.mouseButtons.left;
    }

    public static get right() {
        return this.mouseButtons.right;
    }

    public static get middle() {
        return this.mouseButtons.middle;
    }

    public static initialize() {
        window.addEventListener("click", e => e.preventDefault());
        window.addEventListener("contextmenu", e => e.preventDefault());
        window.addEventListener("wheel", e => {
            this._wheel += e.deltaY * -0.01;
        });

        window.addEventListener("mousemove", (e) => {
            this._x = e.clientX;
            this._y = e.clientY;
        });

        window.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.mouseButtons.left = e.button == 0;
            this.mouseButtons.right = e.button == 2;
            this.mouseButtons.middle = e.button == 1;
        });

        window.addEventListener("mouseup", (e) => {
            e.preventDefault();
            this.mouseButtons.left = this.mouseButtons.left && e.button != 0;
            this.mouseButtons.right = this.mouseButtons.right && e.button != 2;
            this.mouseButtons.middle = this.mouseButtons.middle && e.button != 1;
        });
    }
}

Mouse.initialize();