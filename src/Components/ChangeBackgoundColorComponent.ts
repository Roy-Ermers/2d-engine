import Color from '../Color';
import Component from '../Data/Component';
import Game from '../Game';
import Keyboard from '../Keyboard';

export default class ChangeBackgroundColorComponent implements Component<Color> {
    defaults = Color.random();

    start() {

    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }

    update(color: Color): void {
        if(Keyboard.isDown("Space"))
            color = Color.random();

        Game.canvas.background(color);
    }

}