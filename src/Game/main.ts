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

Game.registerComponent(
    MouseControllerComponent,
    KeyboardControllerComponent,
    FollowPlayerComponent,
    ZoomComponent,
    RotateComponent,
    CameraFollowComponent
);
const shapes: Shape[] = [
    {
        offset: new Vector2(16, 16),
        rotation: 0,
        color: Color.red,
        type: "box",
        size: 32
    },
    {
        offset: new Vector2(-16, -16),
        rotation: 45,
        color: Color.red,
        type: "box",
        size: 32
    },
    {
        offset: new Vector2(16, -16),
        rotation: 0,
        color: Color.red,
        type: "circle",
        size: 32
    },
    {
        offset: new Vector2(-16, 16),
        rotation: 225,
        color: Color.red,
        type: "circle",
        size: 32,
        arc: [0, 180]
    }
];

const points = Convex.convertShapesToPoints(shapes);

async function start() {
    Game.canvas.background = Color.black;
    Camera.zoom = 4;


    const tileMap = await Tilemap.load("assets/tilemap.png", { tileWidth: 16, tileHeight: 16 });

    const player = Game.createEntity("player");

    player.addComponent(TileRendererComponent, {
        tileMap,
        tile: [13, 14, 15]
    });
    player.addComponent([CameraFollowComponent, KeyboardControllerComponent, ZoomComponent]);


    const enemy = Game.createEntity("enemy");
    enemy.transform.position = Vector2.random.multiply(100);
    enemy.addComponent(ShapeRendererComponent, {
        shapes
    });

    Game.onUpdate(() => {
        Game.canvas.wirePolygon(enemy.transform.position.add(100, 0), 0, Color.green, points);
    });

    const circle = Game.createEntity("circle");
    circle.transform.position = Vector2.zero;
    circle.addComponent(ShapeRendererComponent, {
        shapes: [
            {
                type: "circle",
                size: 32,
                color: Color.blue,
                offset: new Vector2(0, 0),
                rotation: 180,
                arc: [0, 180]
            }
        ]
    });
    circle.addComponent(RotateComponent);
}

start();
