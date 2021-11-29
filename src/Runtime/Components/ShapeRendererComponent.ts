import Game, { Entity } from 'Engine';
import Color from '@/Renderer/Color';
import Vector2 from '@/Data/Vector2';
import { Shape } from '@/Renderer';
import RenderComponent from './RenderComponent';
import Convex from '@/Renderer/Convex';
import IBounds from '@/Renderer/IBounds';

export default class ShapeRendererComponent extends RenderComponent {
    override defaults = {
        shapes: [
            {
                type: "circle",
                offset: Vector2.zero,
                rotation: 0,
                color: Color.random(),
                size: 16
            }
        ] as Shape[]
    };

    override getBounds(attributes: this['defaults']): IBounds {
        return Convex.fromShapes(attributes.shapes);
    }

    override render(attributes: this["defaults"], entity: Entity): void {
        for (const shape of attributes.shapes) {
            Game.canvas.drawShape(entity.transform.position, entity.transform.rotation, shape);
        }

        super.render(attributes, entity);
    }
}