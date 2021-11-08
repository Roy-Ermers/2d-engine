import Color from '../Color';
import Component from '../Data/Component';
import Game from '../Game';
import { Position, Shape } from '../Shape';

export default class RendererComponent extends Component<{ position: Position; shapes: Shape[]; }> {
    static readonly identifier = "Renderer";

    defaults = {
        position: [0, 0] as Position,
        shapes: [
            {
                type: "circle",
                position: [0, 0],
                color: Color.random(),
                width: 1,
                arc: [0, Math.PI * 2]
            }
        ] as Shape[]
    };

    start(): void { }

    destroy(): void { }

    update({ position, shapes }: { position: Position, shapes: Shape[]; }): void {
        const color = shapes[0].color;
        Game.canvas.circle(position, 16, color);
    }
}