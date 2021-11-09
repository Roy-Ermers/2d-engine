import Component from '../Data/Component';
import Entity from '../Data/Entity';
import Vector2 from '../Data/Vector2';
import Game from '../Game';

export default class FollowPlayerComponent extends Component {
    get dependencies(): string[] {
        return ["Rigidbody"];
    }

    defaults = {
        position: new Vector2(),
        velocity: new Vector2(),
        speed: 4
    };

    start(_: this['defaults'], entity: Entity): void {
        console.assert(entity.hasComponent("Rigidbody"), "dependency hasn't been added to this entity");
    }

    update(attributes: this['defaults']): void {
        const player = Game.getEntity("player");

        if (!player)
            throw new Error("No player entity found.");

        attributes.velocity = attributes.position.minus(player.position).normalize().invert().multiply(attributes.speed);
    }
}