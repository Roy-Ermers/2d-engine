import TileMap, { Tile } from '@/Assets/Tilemap';
import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';
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

    override getBounds(attributes: this['defaults']): Vector2[] {
        const { tile, tileMap, framerate } = attributes;

        let currentTile: Tile | undefined = undefined;
        if (Array.isArray(tile))
            currentTile = tileMap.getTile(tile[Math.round(Game.time / framerate) % tile.length]);
        else currentTile = attributes.tileMap.getTile(tile);

        const halfWidth = new Vector2(currentTile.width / 2, currentTile.height / 2);

        return [
            new Vector2(-halfWidth.x, -halfWidth.y),
            new Vector2(halfWidth.x, -halfWidth.y),
            new Vector2(halfWidth.x, halfWidth.y),
            new Vector2(-halfWidth.x, halfWidth.y)
        ];
    }

    override start(data: this["defaults"]): void {
        if (data.tileMap == TileMap.empty)
            throw new Error("Please assign a tilemap to this entity.");

        if (data.scale != 1)
            data.tileMap.magnitude = data.scale;

    }

    override render(attributes: this["defaults"], entity: Entity): void {

        const { tile, tileMap, framerate } = attributes;

        if (Array.isArray(tile)) {
            const currentTile = tileMap.getTile(tile[Math.round(Game.time / framerate) % tile.length]);
            const center = new Vector2(currentTile.width / 2, currentTile.height / 2);

            Game.canvas.drawTile(entity.transform.position.minus(center), entity.transform.rotation, tileMap, currentTile);
        }
        else {
            try {
                const currentTile = tileMap.getTile(tile);
                const center = new Vector2(currentTile.width / 2, currentTile.height / 2);

                Game.canvas.drawTile(entity.transform.position.minus(center), entity.transform.rotation, tileMap, tile);
            }
            catch {
                const currentTile = tileMap.getTile(tile);
                console.log(tile, tileMap, currentTile);
            }

        }
        super.render(attributes, entity);
    }
}