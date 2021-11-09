import Game from '../Game';
import Vector2 from './Vector2';

export default class Entity {
    public tags: Set<string>;
    private components: Set<string>;
    public data: Record<string, any> = {
        position: new Vector2()
    };

    public get position(): Vector2 {
        return this.data.position;
    }

    public set position(value: Vector2) {
        this.data.position = value;
    }

    constructor();
    constructor(components: string[]);
    constructor(components: Record<string, any>);
    constructor(component: string, data?: Record<string, any>);
    constructor(component?: string | Record<string, any> | string[], data?: Record<string, any>) {
        if (component)
            this.addComponent(component);

        this.tags = new Set();
        this.components = new Set();
    }

    addComponent(components: string[]): void;
    addComponent(components: Record<string, any>): void;
    addComponent(component: string): void;
    addComponent(component: string, data: Record<string, any>): void;
    addComponent(component: string | Record<string, any> | string[], data?: Record<string, any>): void;
    addComponent(component: string | Record<string, any> | string[], data?: Record<string, any>) {
        if (Array.isArray(component)) {
            for (const name of component) {
                this.addComponent(name);
            }

            return;
        }

        else if (typeof component == "object") {
            for (const [name, data] of Object.entries(component)) {
                this.addComponent(name, data);
            }

            return;
        }

        if (typeof component != 'string')
            throw new Error("Unknown method signature");

        const newcomponent = Game.components.get(component);

        if (!newcomponent)
            throw new Error(`Component "${component}" not found. Make sure you call Game.registerComponent first`);

        this.addComponent(newcomponent.dependencies);

        this.data = { ...this.data, ...(data ?? newcomponent.defaults) };
        this.components.add(component);

        newcomponent.start(this.data, this);
    }

    update() {
        for (const component of this.components) {
            Game.components.get(component)?.update(this.data, this);
        }
    }

    /**
     * Find a component by name.
     */
    hasComponent(component: string): boolean {
        return this.components.has(component);
    }
}
