import Canvas from './Canvas';
import Component, { ComponentType } from './Data/Component';
import Entity from './Data/Entity';
import Keyboard from './Keyboard';

export default class Game {
    private static _canvas: Canvas = new Canvas();
    private static entities: Entity[] = [];
    private static _components: Map<string, Component<any>> = new Map();

    private static _starttime = 0;

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

    public static getEntities(...tags: string[]) {
        if (tags.length == 0)
            return this.entities;

        return this.entities.filter(x => !tags.some(y => !x.tags.has(y)));
    }

    public static createEntity(...tags: string[]) {
        const entity = new Entity();

        for (const tag of tags)
            entity.tags.add(tag);

        this.entities.push(entity);
        return entity;
    }

    public static registerComponent(...components: ComponentType<any>[]) {
        for (const component of components) {
            this._components.set(component.identifier, new component());
        }
    }

    private static loop(frames?: number) {
        requestAnimationFrame(this.loop.bind(this));
        this.canvas.draw();

        if (Keyboard.isDown("escape"))
            this.paused = !this.paused;

        if (this._paused)
            return;

        for (const entity of this.entities)
            entity.update();
    }
}

Game.start();