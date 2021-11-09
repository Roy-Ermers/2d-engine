import Entity from './Entity';

export type ComponentType<T extends Component> = (new (...parameters: ConstructorParameters<typeof Component>) => T) & typeof Component;

export default class Component {
    get dependencies(): string[] {
        return [];
    }

    defaults?: any;

    constructor() { }
    start(attributes: this["defaults"], entity: Entity): void { };
    destroy(attributes: this["defaults"], entity: Entity): void { };
    update(attributes: this["defaults"], entity: Entity): void { };
}