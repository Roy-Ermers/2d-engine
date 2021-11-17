import Game, { Entity } from 'game';
import Color from '@/Color';
import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import { Shape } from '@/Data/Shape';
import RenderComponent from './RenderComponent';

export default class ShapeRendererComponent extends RenderComponent {

    override defaults = {
        position: new Vector2(),
        rotation: 0,
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

    override render({ position, rotation, shapes }: this["defaults"]): void {
        for (const shape of shapes) {
            Game.canvas.drawShape(position, rotation, shape);
        }
    }
}