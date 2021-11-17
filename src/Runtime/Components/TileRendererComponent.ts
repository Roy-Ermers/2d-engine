import TileMap from '@/Assets/Tilemap';
import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import Game from 'game';
import RenderComponent from './RenderComponent';

export default class TileRendererComponent extends RenderComponent {

    override defaults: { position: Vector2, rotation: number, tileMap: TileMap, tile: number | string | string[]; scale: number; framerate: number; } = {
        position: new Vector2(),
        rotation: 0,
        tileMap: TileMap.empty,
        scale: 1,
        tile: 0,
        framerate: 1
    };

    override start(data: this["defaults"]): void {
        if (data.tileMap == TileMap.empty)
            throw new Error("Please assign a tilemap to this entity.");

        if (data.scale != 1)
            data.tileMap.magnitude = data.scale;

    }

    override render({ position, rotation, tile, tileMap, framerate }: this["defaults"]): void {
        if (Array.isArray(tile)) {
            const currentTile = tileMap.getTile(tile[Math.round(Game.time / framerate) % tile.length]);
            const center = new Vector2(currentTile.width / 2, currentTile.height / 2);

            Game.canvas.drawTile(position.minus(center), rotation, tileMap, currentTile);
        }
        else {
            const currentTile = tileMap.getTile(tile);
            const center = new Vector2(currentTile.width / 2, currentTile.height / 2);

            Game.canvas.drawTile(position.minus(center), rotation, tileMap, tile);
        }
    }
}