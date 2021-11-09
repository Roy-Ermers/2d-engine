import Color from '../Color';
import Component from '../Data/Component';
import Vector2 from '../Data/Vector2';
import Game from '../Game';
import { Shape } from '../Shape';

export default class RendererComponent extends Component {

    defaults = {
        position: new Vector2(),
        shapes: [
            {
                type: "circle",
                offset: Vector2.zero,
                color: Color.random(),
                width: 16,
                arc: [0, Math.PI * 2]
            }
        ] as Shape[]
    };

    start(): void { }

    destroy(): void { }

    update({ position, shapes }: this["defaults"]): void {
        for (const shape of shapes) {
            Game.canvas.drawShape(position, shape);
        }
    }
}