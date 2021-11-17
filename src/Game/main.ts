import Camera from '@/Camera';
import { Shape } from '@/Data/Shape';
import Game, { Color, Mouse, Tilemap, Vector2 } from 'game';
import CameraFollowComponent from './Components/CameraFollowComponent';
import FollowPlayerComponent from './Components/FollowPlayerComponent';
import KeyboardControllerComponent from './Components/KeyboardControllerComponent';
import MouseControllerComponent from './Components/MouseControllerComponent';
import RotateComponent from './Components/RotateComponent';
import ZoomComponent from './Components/ZoomComponent';

Game.registerComponent(
    MouseControllerComponent,
    KeyboardControllerComponent,
    FollowPlayerComponent,
    ZoomComponent,
    RotateComponent,
    CameraFollowComponent
);


async function start() {
    Game.canvas.background = Color.black;
    Mouse.visible = false;
    Camera.zoom = 4;

    const tilemap = await Tilemap.load("assets/tilemap.png", { tileWidth: 16, tileHeight: 16 });
    const player = Game.createEntity("player");

    player.addComponent({
        TileRenderer: {
            tileMap: tilemap,
            tile: [31, 32, 33],
            framerate: 10
        },
        CameraFollow: null,
        KeyboardController: null,
        Zoom: null
    });

    const enemy = Game.createEntity("enemy");
    enemy.addComponent({
        Rotate: null,
        ShapeRenderer: {
            shapes: [
                {
                    offset: new Vector2(16, 16),
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
            ]
        }
    });
}

start();