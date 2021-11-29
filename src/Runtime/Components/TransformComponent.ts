import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import { Camera } from '@/Renderer';
import Game, { Color, Entity } from 'Engine';

export default class TransformComponent extends Component {
    override defaults = {
        position: Vector2.zero,
        rotation: 0
    };

    override update(attributes: this['defaults'], entity: Entity): void {
        Game.spatialMap.set(entity);
    }
}