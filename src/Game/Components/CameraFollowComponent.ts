import Camera from '@/Renderer/Camera';
import Game, { Color, Component, Entity, Vector2 } from 'Engine';

export default class CameraFollowComponent extends Component {
    override defaults = {
        followSpeed: 0.8,
        threshold: 100
    };


    override update({ followSpeed, threshold }: this['defaults'], entity: Entity): void {
        const speed = Camera.position.distance(entity.transform.position) / (threshold / Camera.zoom) * followSpeed;

        Camera.position = Camera.position.lerp(entity.transform.position, speed);

        if (Game.debug) {
            Game.canvas.vector(
                Camera.cameraToWorldSpace(
                    new Vector2(50, 50)
                ),
                0,
                Vector2.up.multiply(40).divide(Camera.zoom),
                Color.red
            );
        }
    }
}
