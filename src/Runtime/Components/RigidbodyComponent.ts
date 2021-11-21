import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import Game, { Color, Entity } from 'Engine';
import ShapeRendererComponent from './ShapeRendererComponent';
import TransformComponent from './TransformComponent';

export default class RigidbodyComponent extends Component {
    override dependencies = [TransformComponent];
    override defaults = {
        velocity: new Vector2(),
        friction: 0.2,
        acceleration: 0.8
    };

    override start(): void { }

    override destroy(): void { }

    override update(attributes: this["defaults"], entity: Entity): void {
        let { friction, acceleration } = attributes;

        attributes.velocity = attributes.velocity.lerp(Vector2.zero, friction);

        if (attributes.velocity.length > friction)
            entity.transform.position = entity.transform.position.lerp(entity.transform.position.add(attributes.velocity), acceleration);

        if (Game.debug) {
            Game.canvas.vector(entity.transform.position, entity.transform.rotation, attributes.velocity.multiply(25), Color.green);
        }
    }
}