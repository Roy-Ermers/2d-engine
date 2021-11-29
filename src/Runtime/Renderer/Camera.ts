import Vector2 from '@/Data/Vector2';
import { DEGREE_TO_RADIAL } from '@/Helpers';
import Game from '../Game';

export default class Camera {
    static position = new Vector2();
    static zoom = 1;
    private static _rotation = 0;

    public static get rotation() {
        return this._rotation;
    }

    public static set rotation(value) {
        if (this._rotation === value)
            return;

        this._rotation = value;
    }

    public static get up() {
        return Vector2.fromAngle(-this.rotation);
    }

    public static worldToCameraSpace(worldPosition: Vector2) {
        const rotation = (this.rotation % 360) * DEGREE_TO_RADIAL;

        const x = (worldPosition.x - this.position.x);
        const y = (worldPosition.y - this.position.y);
        const sin = Math.sin(rotation);
        const cos = Math.cos(rotation);

        return new Vector2(
            (x * cos - y * sin) * this.zoom + Game.canvas.middle.x,
            (x * sin + y * cos) * this.zoom + Game.canvas.middle.y
        );
    }

    public static cameraToWorldSpace(cameraPosition: Vector2) {
        return cameraPosition.minus(Game.canvas.middle).divide(this.zoom).rotate(-this.rotation).add(this.position);
    }
}