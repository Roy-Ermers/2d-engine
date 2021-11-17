import Camera from '@/Camera';
import Game, { Color, Component, Entity, Vector2 } from 'game';

export default class CameraFollowComponent extends Component {
    override defaults = {
        followSpeed: 0.8,
        threshold: 100
    };

    override update({ followSpeed, threshold }: this['defaults'], entity: Entity): void {
        const speed = Camera.position.distance(entity.position) / threshold * followSpeed;

        Camera.position = Camera.position.lerp(entity.position, speed);

        if (Game.debug) {
            Game.canvas.vector(Camera.cameraToWorldSpace(new Vector2(Camera.zoom * 15, Camera.zoom * 15).minus(Game.canvas.middle)), 0, Vector2.up.multiply(10), Color.red);
        }
    }
}