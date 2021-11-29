import Game, { Color, Entity, Vector2 } from 'Engine';
import Component from '@/Data/Component';
import IBounds from '@/Renderer/IBounds';

export default class RenderComponent extends Component {
    getBounds(attributes: this["defaults"]): IBounds {
        return {
            box: [],
            complex: []
        }
    }

    render(attributes: this["defaults"], entity: Entity) {
        if (Game.debug) {
            Game.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.white, entity.bounds.box);
            Game.canvas.wirePolygon(entity.transform.position, entity.transform.rotation, Color.green, entity.bounds.complex);
        }
    }
}