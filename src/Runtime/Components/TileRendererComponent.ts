import TileMap, { Tile } from '@/Assets/Tilemap';
import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
import IBounds from '@/Renderer/IBounds';
import Game, { Entity } from 'Engine';
import RenderComponent from './RenderComponent';

export default class TileRendererComponent extends RenderComponent {

    override defaults: {
        tileMap: TileMap,
        scale: number,
        tile: number | number[],
        framerate: number;
    } = {
            tileMap: TileMap.empty,
            scale: 1,
            tile: 0,
            framerate: 5
        };

    override getBounds(attributes: this['defaults']): IBounds {
        const { tile, tileMap, framerate } = attributes;

        let currentTile: Tile | undefined = undefined;
        if (Array.isArray(tile))
            currentTile = tileMap.getTile(tile[Math.round(Game.time / framerate) % tile.length]);
        else currentTile = attributes.tileMap.getTile(tile);

        const halfWidth = new Vector2(currentTile.width / 2, currentTile.height / 2);
        const bounds = [
            new Vector2(-halfWidth.x, -halfWidth.y),
            new Vector2(halfWidth.x, -halfWidth.y),
            new Vector2(halfWidth.x, halfWidth.y),
            new Vector2(-halfWidth.x, halfWidth.y)
        ];
        return {
            box: bounds,
            complex: bounds
        };
    }

    override start(data: this["defaults"]): void {
        if (data.tileMap == TileMap.empty)
            throw new Error("Please assign a tilemap to this entity.");

        console.log(data.tileMap);
        if (data.scale != 1)
            data.tileMap.magnitude = data.scale;

    }

    override render(attributes: this["defaults"], entity: Entity): void {

        const { tile, tileMap, framerate } = attributes;

        if (Array.isArray(tile)) {
            const currentTile = tileMap.getTile(tile[Math.round(Game.time / framerate) % tile.length]);

            Game.canvas.drawTile(entity.transform.position, entity.transform.rotation, tileMap, currentTile);
        }
        else {
            try {
                Game.canvas.drawTile(entity.transform.position, entity.transform.rotation, tileMap, tile);
            }
            catch {
                const currentTile = tileMap.getTile(tile);
                console.log(tile, tileMap, currentTile);
            }

        }
        super.render(attributes, entity);
    }
}