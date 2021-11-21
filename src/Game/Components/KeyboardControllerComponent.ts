import { Camera } from '@/Renderer';
import RigidbodyComponent from '@/Components/RigidbodyComponent';
import Game, { Component, Entity, Keyboard, Vector2 } from 'Engine';

export default class KeyboardControllerComponent extends Component {

    override readonly dependencies = [RigidbodyComponent];

    override defaults = {
        speed: 1,
        sprintSpeed: 5,
        velocity: new Vector2()
    };

    override update(attributes: this['defaults'], entity: Entity): void {
        const rigidbody = entity.getComponent(RigidbodyComponent);
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

        rigidbody.velocity = rigidbody.velocity.add(direction);
    }

}