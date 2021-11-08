import Component from '../Data/Component';
import Keyboard from '../Keyboard';
import { Position } from '../Shape';

export default class KeyboardControllerComponent extends Component<{ position: Position; speed: number; }> {
    static readonly identifier = "KeyboardController";

    defaults = {
        position: [0, 0] as Position,
        speed: 1
    };

    start(): void { }

    destroy(): void { }

    update(attributes: { position: Position; speed: number; }): void {
        attributes.speed = Keyboard.isDown('shift') ? 5 : 1;

        if (Keyboard.isDown("s")) {
            attributes.position = [attributes.position[0], attributes.position[1] + attributes.speed];
        }

        if (Keyboard.isDown("w")) {
            attributes.position = [attributes.position[0], attributes.position[1] - attributes.speed];
        }

        if (Keyboard.isDown("a")) {
            attributes.position = [attributes.position[0] - attributes.speed, attributes.position[1]];
        }

        if (Keyboard.isDown("d")) {
            attributes.position = [attributes.position[0] + attributes.speed, attributes.position[1]];
        }
    }
}