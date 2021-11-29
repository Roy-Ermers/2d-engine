import Game from 'Engine';
import { generateId, structuredClone } from '@/Helpers';
import Vector2 from '@/Data/Vector2';
import RenderComponent from '@/Components/RenderComponent';
import Component from './Component';
import TransformComponent from '@/Components/TransformComponent';
import { ComponentType } from '.';
import ZoomComponent from 'src/Game/Components/ZoomComponent';
import IBounds from '@/Renderer/IBounds';

const convexHullCache: Map<string, IBounds> = new Map();
(window as any).convexHullCache = convexHullCache;

export default class Entity {
    public tags: Set<string>;
    private _components: Map<Component, any>;
    private _renderComponents: Set<string>;
    private _id: string;

    public get transform() {
        return this.getComponent(TransformComponent);
    }

    public get bounds(): IBounds {
        if (convexHullCache.has(this.id))
            return convexHullCache.get(this.id)!;

        const component = this.getAllComponents().find(x => x[0] instanceof RenderComponent);
        if (!component) {
            console.log(`Entity ${this.id} has no bounds.`);
            return {
                box: [],
                complex: []
            };
        }

        const bounds = (component[0] as RenderComponent).getBounds(component[1]);
        convexHullCache.set(this.id, bounds);

        return bounds;
    }

    public get id() {
        return this._id;
    }

    constructor() {
        this._id = generateId();
        this.tags = new Set();
        this._components = new Map();
        this._renderComponents = new Set();
        this.addComponent(TransformComponent);
    }

    start() {
        for (const [component, data] of this._components) {
            component?.start(data, this);
        }
    }

    private callDestroyHooks() {
        for (const [component, data] of this._components) {
            component?.destroy(data, this);
        }
    }

    update() {
        for (const [component, data] of this._components) {
            component?.update(data, this);

            if (component instanceof RenderComponent)
                component?.render(data, this);
        }
    }

    render() {
        for (const componentName of this._renderComponents) {
            const component = Game.components.get(componentName) as RenderComponent;
            const data = this._components.get(component);

            component?.render(data, this);
        }
    }

    removeComponent<t extends ComponentType<any>>(name: t) {
        const _component = Game.components.get(name.name);

        if (_component)
            this._components.delete(_component);
    }

    addComponent<t extends ComponentType<any>>(names: t[]): void;
    addComponent<t extends ComponentType<any>>(name: t): void;
    addComponent<t extends ComponentType<any>>(name: t, data: Partial<InstanceType<t>["defaults"]>): void;
    addComponent<t extends ComponentType<any>>(component: t | t[], data?: Partial<InstanceType<t>["defaults"]>) {
        if (Array.isArray(component)) {
            for (const _component of component)
                this.addComponent(_component);

            return;
        }
        else {
            const _component = Game.components.get(component.name);
            if (_component === undefined)
                throw new Error(`Component ${component.name} not found.`);

            if (_component.dependencies)
                for (const dependency of _component.dependencies)
                    this.addComponent(dependency);


            if (this.hasComponent(component)) {
                console.warn(`Entity ${this.id} already has a ${component.name}.`);
                return;
            }

            this._components.set(_component, { ..._component.defaults, ...data });
            _component?.start({ ..._component.defaults, ...data }, this);
        }
    }

    getComponent<t extends ComponentType<any>>(component: t): InstanceType<t>["defaults"] {
        const _component = Game.components.get(component.name);

        if (_component == undefined)
            throw new Error(`Component ${component.name} doesn't exist.`);

        return this._components.get(_component);
    }

    getAllComponents() {
        return [...this._components.entries()]
    }

    /**
     * Find a component by name.
     */
    hasComponent(component: ComponentType<any>): boolean {
        const _component = Game.components.get(component.name);

        if (_component == undefined)
            return false;

        return this._components.has(_component);
    }

    destroy() {
        this.callDestroyHooks();

        Game.removeEntity(this);
    }

    clone() {
        const copy = new Entity();
        copy.tags = new Set(this.tags);
        for (const [component, data] of this._components)
            copy.addComponent(component.constructor as ComponentType<any>, structuredClone(data));

        return copy;
    }
}
