import Component from '../Data/Component';
import Vector2 from '../Data/Vector2';

export default class RigidbodyComponent extends Component {
    defaults = {
        position: new Vector2(),
        velocity: new Vector2(),
        friction: 0.2,
        acceleration: 0.8
    };

    start(): void { }

    destroy(): void { }

    override update(attributes: this["defaults"]): void {
        let { friction, acceleration } = attributes;

        attributes.velocity = attributes.velocity.lerp(Vector2.zero, friction);
        attributes.position = attributes.position.lerp(attributes.position.add(attributes.velocity), acceleration);
    }
}