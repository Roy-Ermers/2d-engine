import Camera from '@/Camera';
import Game, { Component, Keyboard, Vector2 } from 'game';

export default class KeyboardControllerComponent extends Component {

    override get dependencies(): string[] {
        return ["Rigidbody"];
    }

    override defaults = {
        speed: 1,
        sprintSpeed: 5,
        velocity: new Vector2()
    };

    override update(attributes: this['defaults']): void {
        let { speed, sprintSpeed } = attributes;

        if (Keyboard.isDown("shift"))
            speed = sprintSpeed;

        let direction = Vector2.zero;
        if (Keyboard.isDown("s")) {
            direction = direction.add(Vector2.down);
        }

        if (Keyboard.isDown("w")) {
            direction = direction.add(Vector2.up);
        }

        if (Keyboard.isDown("a")) {
            direction = direction.add(Vector2.left);
        }

        if (Keyboard.isDown("d")) {
            direction = direction.add(Vector2.right);
        }

        direction = direction.rotate(-Camera.rotation);

        attributes.velocity = attributes.velocity.lerp(direction.multiply(speed), 0.2);
    }

}