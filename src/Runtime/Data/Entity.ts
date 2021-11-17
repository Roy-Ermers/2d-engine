import Game from 'game';
import { structuredClone } from '@/Helpers';
import Vector2 from '@/Data/Vector2';
import RenderComponent from '@/Components/RenderComponent';

export default class Entity {
    public tags: Set<string>;
    private _components: Set<string>;
    private _renderComponents: Set<string>;
    public data: Record<string, any> = {};

    public get components(): string[] {
        return [...this._components];
    }

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
    constructor(component: string, tags: string[]);
    constructor(component?: string | Record<string, any> | string[], data?: Record<string, any> | string[]) {
        this.tags = new Set();
        this._components = new Set();
        this._renderComponents = new Set();
        this.addComponent("Transform");

        if (Array.isArray(data)) {
            this._components = new Set(data);

            if (component)
                this.addComponent(component);
        }

        else if (component) {
            this.addComponent(component, data);
        }

    }

    update() {
        for (const componentName of this._components) {
            const component = Game.components.get(componentName);
            component?.update(this.data, this);

            if (component instanceof RenderComponent)
                component?.render(this.data, this);
        }
    }

    render() {
        for (const componentName of this._renderComponents) {
            const component = Game.components.get(componentName) as RenderComponent;
            component?.render(this.data, this);
        }
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
                if (data === null)
                    this.addComponent(name);
                else
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
        data = { ...newcomponent.defaults, ...data };
        this.data = { ...this.data, ...data };
        this._components.add(component);

        if (newcomponent instanceof RenderComponent)
            this._renderComponents.add(component);

        newcomponent.start(this.data, this);
    }

    /**
     * Find a component by name.
     */
    hasComponent(component: string): boolean {
        return this._components.has(component);
    }


    clone() {
        const copy = new Entity(this.components);
        copy.tags = new Set(this.tags);
        copy.data = structuredClone(this.data);

        return copy;
    }
}
