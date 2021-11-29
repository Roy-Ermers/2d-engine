import { Camera } from '@/Renderer';
import ShapeRendererComponent from '@/Components/ShapeRendererComponent';
import TileRendererComponent from '@/Components/TileRendererComponent';
import type { Shape } from '@/Renderer';
import Game, { Color, Entity, Mouse, Tilemap, Vector2 } from 'Engine';
import CameraFollowComponent from './Components/CameraFollowComponent';
import FollowPlayerComponent from './Components/FollowPlayerComponent';
import KeyboardControllerComponent from './Components/KeyboardControllerComponent';
import MouseControllerComponent from './Components/MouseControllerComponent';
import RotateComponent from './Components/RotateComponent';
import ZoomComponent from './Components/ZoomComponent';
import Convex from '@/Renderer/Convex';
import MouseComponent from './Components/MouseComponent';

Game.registerComponent(
    MouseControllerComponent,
    KeyboardControllerComponent,
    FollowPlayerComponent,
    ZoomComponent,
    RotateComponent,
    CameraFollowComponent,
    MouseComponent
);
const shapes: Shape[] = [
    {
        offset: Vector2.zero,
        rotation: 225,
        color: Color.red,
        type: "circle",
        size: 32
    }
];

async function start() {
    Game.canvas.background = Color.black;

    const tileMap = await Tilemap.load("assets/tilemap.png", { tileWidth: 16, tileHeight: 16 });

    const player = Game.createEntity("player");

    player.addComponent(TileRendererComponent, {
        tileMap,
        tile: [13, 14, 15]
    });
    player.addComponent([CameraFollowComponent, KeyboardControllerComponent, ZoomComponent, RotateComponent]);


    const enemy = Game.createEntity("enemy");
    enemy.transform.position = Vector2.random.multiply(100);
    enemy.addComponent(ShapeRendererComponent, {
        shapes
    });

    for (let i = 0; i < 1200; i++) {
        const clone = enemy.clone();
        clone.transform.position = Vector2.random.multiply(1600);
        clone.getComponent(ShapeRendererComponent).shapes[0].color = Color.random();

        Game.registerEntity(clone);
    }
}

start();
