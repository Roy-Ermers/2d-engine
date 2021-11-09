import Component from '../Data/Component';
import Vector2 from '../Data/Vector2';
import Game from '../Game';
import Keyboard from '../Keyboard';

export default class KeyboardControllerComponent extends Component {

    get dependencies(): string[] {
        return ["Rigidbody"];
    }

    defaults = {
        speed: 1,
        velocity: new Vector2()
    };

    update(attributes: this['defaults']): void {
        const { speed } = attributes;

        attributes.speed = Keyboard.isDown("shift") ? 7.5 : 5;

        Game.canvas.text(Keyboard.isDown("shift").toString(), 0, 16);

        if (Keyboard.isDown("s")) {
            attributes.velocity = attributes.velocity.add(Vector2.down.multiply(speed));
        }

        if (Keyboard.isDown("w")) {
            attributes.velocity = attributes.velocity.add(Vector2.up.multiply(speed));
        }

        if (Keyboard.isDown("a")) {
            attributes.velocity = attributes.velocity.add(Vector2.left.multiply(speed));
        }

        if (Keyboard.isDown("d")) {
            attributes.velocity = attributes.velocity.add(Vector2.right.multiply(speed));
        }
    }

}