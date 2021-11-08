import KeyboardControllerComponent from './Components/KeyboardControllerComponent';
import RendererComponent from './Components/RendererComponent';
import { ComponentType } from './Data/Component';
import Game from './Game';
Game.registerComponent(RendererComponent as ComponentType<any>);
Game.registerComponent(KeyboardControllerComponent as ComponentType<any>);

const entity = Game.createEntity();
entity.data.position = [Game.canvas.width / 2, Game.canvas.height / 2];
entity.addComponent("Renderer", "KeyboardController");