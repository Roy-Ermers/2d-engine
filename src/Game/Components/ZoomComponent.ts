import { Camera } from '@/Renderer';
import { lerp } from '@/Helpers';
import Game, { Color, Component, Keyboard, Mouse, Vector2 } from 'Engine';

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

        attributes.zoom = lerp(attributes.zoom, Math.max(1, Math.min(Mouse.wheel, 16)), 0.8);

        Camera.rotation = lerp(Camera.rotation, attributes.cameraRotation, 0.02);
        Camera.zoom = lerp(Camera.zoom, attributes.zoom, attributes.zoomSpeed);
    }

}