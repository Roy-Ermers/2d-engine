import Canvas from './Canvas';
import Component, { ComponentType } from './Data/Component';
import Entity from './Data/Entity';
import Keyboard from './Keyboard';

export default class Game {
    private static _canvas: Canvas = new Canvas();
    private static _entities: Entity[] = [];
    private static _components: Map<string, Component> = new Map();
    private static _starttime = 0;
    private static updateCallbacks: (() => void)[] = [];

    public static get time() {
        return performance.now() - this._starttime;
    }

    private static _paused = false;
    public static get paused(): boolean {
        return this._paused;
    }

    public static set paused(value) {
        this._paused = value;

        if (!this._paused)
            this.start();
    }

    public static get canvas() {
        return this._canvas;
    }

    public static get components() {
        return this._components;
    }

    public static start() {
        this._starttime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    public static getEntity(...tags: string[]) {
        return this._entities.find(x => !tags.some(y => !x.tags.has(y)));
    }

    public static getEntities(...tags: string[]) {
        if (tags.length == 0)
            return this._entities;

        return this._entities.filter(x => !tags.some(y => !x.tags.has(y)));
    }

    public static registerEntity(entity: Entity) {
        this._entities.push(entity);
    }

    public static createEntity(...tags: string[]) {
        const entity = new Entity();

        for (const tag of tags)
            entity.tags.add(tag);

        this._entities.push(entity);
        return entity;
    }

    public static registerComponent(...components: ComponentType<any>[]) {
        for (const component of components) {
            this._components.set(component.name.replace(/Component$/g, ''), new component());
        }
    }

    public static onUpdate(callback: () => void) {
        this.updateCallbacks.push(callback);
    }

    private static loop(frames?: number) {
        this.canvas.draw();

        if (Keyboard.isPressed("escape"))
            this.paused = !this.paused;


        if (this._paused) {
            for (const entity of this._entities.filter(x => x.hasComponent("Renderer")))
                this._components.get("Renderer")?.update(entity.data, entity);
        }
        else {
            for (const entity of this._entities)
            entity.update();

            this.updateCallbacks.forEach(x => x());
        }

        Keyboard.clearFrame();
        requestAnimationFrame(this.loop.bind(this));
    }
}

Game.start();