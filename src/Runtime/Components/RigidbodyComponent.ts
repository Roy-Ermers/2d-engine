import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import Game, { Color } from 'game';

export default class RigidbodyComponent extends Component {
    override defaults = {
        position: new Vector2(),
        rotation: 0,
        velocity: new Vector2(),
        friction: 0.2,
        acceleration: 0.8
    };

    override start(): void { }

    override destroy(): void { }

    override update(attributes: this["defaults"]): void {
        let { friction, acceleration } = attributes;

        attributes.velocity = attributes.velocity.lerp(Vector2.zero, friction);

        if (attributes.velocity.length > friction)
            attributes.position = attributes.position.lerp(attributes.position.add(attributes.velocity), acceleration);

        if (Game.debug) {
            Game.canvas.vector(attributes.position, attributes.rotation, attributes.velocity.multiply(25), Game.canvas.background.invert());

        }
    }
}