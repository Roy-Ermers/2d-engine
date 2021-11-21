import Vector2 from '@/Data/Vector2';
import Game from '../Game';

console.log(Vector2);

export default class Camera {
    static position = new Vector2();
    static zoom = 1;
    static rotation = 0;

    public static get up() {
        return Vector2.fromAngle(-this.rotation);
    }

    public static worldToCameraSpace(worldPosition: Vector2) {
        const rotation = (this.rotation) % 360;
        return worldPosition
            .minus(this.position)
            .rotate(rotation)
            .multiply(this.zoom)
            .add(Game.canvas.middle)
    }

    public static cameraToWorldSpace(cameraPosition: Vector2) {
        return cameraPosition.rotate(-this.rotation).divide(this.zoom).add(this.position);
    }
}