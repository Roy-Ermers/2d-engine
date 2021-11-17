import Game, { Component, Entity, Vector2 } from 'game';

export default class FollowPlayerComponent extends Component {
    override get dependencies(): string[] {
        return ["Rigidbody"];
    }

    override defaults = {
        position: new Vector2(),
        velocity: new Vector2(),
        speed: 1,
        distance: 16
    };

    override update(attributes: this['defaults']): void {
        const player = Game.getEntity("player");

        if (!player)
            throw new Error("No player entity found.");

        const distance = attributes.position.distance(player.position);

        if (distance > attributes.distance)
            attributes.velocity = attributes.position.minus(player.position).normalize().invert().multiply(attributes.speed).limit(attributes.distance);
    }
}