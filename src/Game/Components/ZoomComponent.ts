import Camera from '@/Camera';
import { lerp } from '@/Helpers';
import Game, { Color, Component, Keyboard, Vector2 } from 'game';

export default class ZoomComponent extends Component {

    override defaults = {
        cameraRotation: 0,
        zoom: 1,
        zoomSpeed: 0.05
    };

    override update(attributes: this["defaults"]) {

        if (Keyboard.isPressed("arrowright"))
            attributes.cameraRotation += 45;

        if (Keyboard.isPressed("arrowleft"))
            attributes.cameraRotation -= 45;

        if (Keyboard.isDown("arrowup"))
            attributes.zoom += attributes.zoomSpeed;

        if (Keyboard.isDown("arrowdown") && attributes.zoom > 1)
            attributes.zoom -= attributes.zoomSpeed;

        Camera.rotation = lerp(Camera.rotation, attributes.cameraRotation, .05);
        Camera.zoom = attributes.zoom;

        Game.canvas.text(Vector2.zero, 0, Camera.rotation.toString(), Color.red);
    }

}