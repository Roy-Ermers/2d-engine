import Color from './Color';
import FollowPlayerComponent from './Components/FollowPlayerComponent';
import KeyboardControllerComponent from './Components/KeyboardControllerComponent';
import RendererComponent from './Components/RendererComponent';
import RigidbodyComponent from './Components/RigidbodyComponent';
import Vector2 from './Data/Vector2';
import Game from './Game';

Game.registerComponent(
    RendererComponent,
    RigidbodyComponent,
    KeyboardControllerComponent,
    FollowPlayerComponent
);

const player = Game.createEntity("player");
player.addComponent(["Renderer", "Rigidbody", "KeyboardController"]);

for (let i = 0; i < Game.canvas.width % 64 + Game.canvas.height % 64; i++) {
    const entity = Game.createEntity();
    entity.addComponent({
        Renderer: {
            shapes: [
                {
                    type: "circle",
                    offset: Vector2.zero,
                    width: 24,
                    color: Color.red
                }
            ]
        }
    });

    entity.addComponent("FollowPlayer");

    const x = Math.floor(i / 64);
    const y = i % Math.floor(Game.canvas.width / 64);
    entity.position = entity.position.add(x * 64, y * 64);
}

Game.onUpdate(() => {
    // console.log(entity.data.velocity);
});

const vector = new Vector2(2, 5);
console.log(vector.normalize(), vector.normalize().normalize().normalize());