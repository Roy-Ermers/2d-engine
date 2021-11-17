import RenderComponent from '@/Components/RenderComponent';
import ShapeRendererComponent from '@/Components/ShapeRendererComponent';
import RigidbodyComponent from '@/Components/RigidbodyComponent';
import TileRendererComponent from '@/Components/TileRendererComponent';
import TransformComponent from '@/Components/TransformComponent';
import Game from './Game';

Game.registerComponent(
    TransformComponent,
    RigidbodyComponent,
    RenderComponent,
    ShapeRendererComponent,
    TileRendererComponent
);

export { default as Tilemap } from "@/Assets/Tilemap";
export { default as Color } from "@/Color";
export { default as Component } from "@/Data/Component";
export { default as Entity } from "@/Data/Entity";
export { default as Vector2 } from "@/Data/Vector2";
export { default as Keyboard } from "@/Keyboard";
export { default as Mouse } from "@/Mouse";

export default Game;