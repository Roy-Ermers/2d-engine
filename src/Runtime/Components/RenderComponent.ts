import Game, { Color, Entity, Vector2 } from 'Engine';
import Component from '@/Data/Component';

export default class RenderComponent extends Component {
    getBounds(attributes: this["defaults"]) {
        return [
            new Vector2(-16, -16),
            new Vector2(16, 16),
            new Vector2(-16, 16),
            new Vector2(16, -16),
            new Vector2(-16, -16),
            new Vector2(16, -16),
            new Vector2(16, 16),
            new Vector2(-16, 16),
        ];
    }

    render(attributes: this["defaults"], entity: Entity) {
        if (Game.debug) {
            Game.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.white, entity.bounds);
        }
    }
}