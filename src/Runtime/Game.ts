import Canvas from '@/Renderer/Canvas';
import Component, { ComponentType } from '@/Data/Component';
import Entity from '@/Data/Entity';
import Keyboard from '@/Keyboard';
import SpatialMap from './Data/SpatialMap';

export default class Game {
    private static _canvas: Canvas = new Canvas();
    private static _entities: Map<string, Entity> = new Map();
    private static _components: Map<string, Component> = new Map();
    private static _time = 0;
    private static updateCallbacks: (() => void)[] = [];

    private static _paused = false;
    private static _debug = true;

    public static spatialMap: SpatialMap = new SpatialMap(512);

    public static get debug() {
        return this._debug;
    }

    public static get time() {
        return this._time;
    }

    public static get paused(): boolean {
        return this._paused;
    }

    public static set paused(value) {
        this._paused = value;

        if (!this._paused) {
            this.start();
        }
    }

    public static get canvas() {
        return this._canvas;
    }

    public static get components() {
        return this._components;
    }


    public static start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    public static getEntityByTags(...tags: string[]) {
        return [...this._entities.values()].find(x => !tags.some(y => !x.tags.has(y)));
    }

    public static getEntityById(id: string) {
        return this._entities.get(id);
    }

    public static getEntities(...tags: string[]) {
        if (tags.length == 0)
            return [...this._entities.values()];

        return [...this._entities.values()].filter(x => !tags.some(y => !x.tags.has(y)));
    }

    public static registerEntity(entity: Entity) {
        this._entities.set(entity.id, entity);
        entity.start();
    }

    static removeEntity(entity: Entity) {
        this._entities.delete(entity.id);
    }

    public static createEntity(...tags: string[]) {
        const entity = new Entity();

        for (const tag of tags)
            entity.tags.add(tag);

        this._entities.set(entity.id, entity);
        return entity;
    }

    public static registerComponent(...components: ComponentType<any>[]) {
        for (const component of components) {
            this._components.set(component.name, new component());
        }
    }

    public static onUpdate(callback: () => void) {
        this.updateCallbacks.push(callback);
    }

    private static loop() {
        this.canvas.draw();

        this._time++;
        if (this._time > 60)
            this._time = 0;

        if (Keyboard.isPressed("escape")) {
            this.paused = !this.paused;
        }

        if (Keyboard.isPressed("ctrl", "f1")) {
            this._debug = !this._debug;
            // import("./Debug/Debugger.js")
            //     .then(x => { console.log(x); x.default.start(); })
            //     .catch(e => console.error("Failed to load debugger", e));
        }


        for (const entity of this._entities.values()) {
            entity.render();

            if (!this._paused)
                entity.update();
        }

        this.updateCallbacks.forEach(x => x());

        Keyboard.clearFrame();

        requestAnimationFrame(this.loop.bind(this));
    }
}

(window as any).Game = Game;
Game.start();