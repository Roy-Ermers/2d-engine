export interface Tile {
    name?: string;
    x: number;
    y: number;

    width: number,
    height: number;
};

type TileMapOptions = {
    rows: number;
    columns: number;
    tileWidth: number;
    tileHeight: number;
};

export default class TileMap {
    private _image: HTMLImageElement | null;
    private tiles: Tile[];
    public magnitude: number = 1;

    public static get empty() {
        return new TileMap(null, []);
    }

    public get image() {
        return this._image;
    }

    private constructor(image: HTMLImageElement | null, tiles: Tile[]) {
        this._image = image;
        this.tiles = tiles;
    }

    public getTile(name: string): Tile;
    public getTile(index: number): Tile;
    public getTile(index: number | string): Tile;
    public getTile(index: string | number) {
        if (typeof index === "number") {
            return this.tiles[index];
        }

        return this.tiles.find(x => x.name == index);
    }

    private static loadImage(url: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();

            image.addEventListener("error", () => reject(`Could not find ${url}`));
            image.addEventListener("load", () => resolve(image));
            image.src = url;
        });
    }

    static async load(url: string, options: Partial<TileMapOptions> | Tile[]) {
        const image = await this.loadImage(url);

        if (Array.isArray(options))
            return new TileMap(image, options);

        const tiles: Tile[] = [];

        if (!options.rows && !options.tileHeight)
            throw new Error(`You need to supply either rows or tileHeight`);

        if (!options.columns && !options.tileWidth)
            throw new Error(`You need to supply either rows or tileHeight`);

        const settings = {
            rows: options.rows ?? image.naturalWidth / options.tileWidth!,
            columns: options.columns ?? image.naturalHeight / options.tileHeight!,

            width: options.tileWidth,
            height: options.tileHeight,
        };

        settings.width ??= image.naturalWidth / settings.columns;
        settings.height ??= image.naturalHeight / settings.rows;

        for (let y = 0; y < settings.columns; y++) {
            for (let x = 0; x < settings.rows; x++) {

                tiles.push({
                    width: settings.width,
                    height: settings.height,
                    x: x * settings.width,
                    y: y * settings.height
                });
            }
        }

        return new TileMap(image, tiles);
    }

    private copy() {
        return this;
    }
}