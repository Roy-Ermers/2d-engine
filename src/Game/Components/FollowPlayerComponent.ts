import RigidbodyComponent from '@/Components/RigidbodyComponent';
import Game, { Component, Entity, Vector2 } from 'Engine';

export default class FollowPlayerComponent extends Component {
    override readonly dependencies = [RigidbodyComponent];

    override defaults = {
        speed: 1,
        distance: 16
    };

    override update(attributes: this['defaults'], entity: Entity): void {
        const player = Game.getEntity("player");
        const rigidbody = entity.getComponent(RigidbodyComponent);

        if (!player)
            throw new Error("No player entity found.");

        const distance = entity.transform.position.distance(player.transform.position);

        if (distance > attributes.distance)
            rigidbody.velocity = entity.transform.position.minus(player.transform.position).normalize().invert().multiply(attributes.speed).limit(attributes.distance);
    }
}