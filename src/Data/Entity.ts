import Game from '../Game';

export default class Entity {
    public tags: Set<string>;
    private components: Set<string>;
    public data: Record<string, any> = {
        position: [0, 0]
    };


    constructor();
    constructor(firstComponent: string, ...components: string[]);
    constructor(components: Record<string, any>);
    constructor(component: string, data?: Record<string, any>);
    constructor(firstComponent?: string | Record<string, any>, ...components: ([Record<string, any>?] | string[])) {
        if (firstComponent)
            this.addComponent(firstComponent, ...components);

        this.tags = new Set();
        this.components = new Set();
    }

    addComponent(firstComponent: string, ...components: string[]): void;
    addComponent(components: Record<string, any>): void;
    addComponent(component: string, data?: Record<string, any>): void;
    addComponent(firstComponent: string | Record<string, any>, ...components: ([Record<string, any>?] | string[])): void;
    addComponent(firstComponent: string | Record<string, any>, ...components: ([Record<string, any>?] | string[])) {
        if (typeof firstComponent == "object") {
            for (const [name, data] of Object.entries(firstComponent)) {
                const component = Game.components.get(name);
                if (!component)
                    throw new Error(`Component "${name}" not found. Make sure you call Game.registerComponent first`);

                this.components.add(name);
                this.data = { ...this.data, ...data };
            }
        }

        else if (typeof firstComponent == "string") {
            const component = Game.components.get(firstComponent);
            const data = components[0];

            if (!component)
                throw new Error(`Component "${firstComponent}" not found. Make sure you call Game.registerComponent first`);

            this.components.add(firstComponent);
            if (typeof data == "object")
                this.data = { ...this.data, ...data };

            else
                this.data = { ...this.data, ...component.defaults };
        }

        for (const name of components) {
            if (typeof name == "string") {
                const component = Game.components.get(name);
                if (!component)
                    throw new Error(`Component "${name}" not found. Make sure you call Game.registerComponent first`);

                this.components.add(name);
                this.data = { ...this.data, ...component.defaults };
            }
        }

        console.log(this.data);
    }

    update() {
        for (const component of this.components) {
            Game.components.get(component)?.update(this.data);
        }
    }

    /**
     * Find a component by name.
     */
    hasComponent(component: string): boolean {
        return this.components.has(component);
    }
}
