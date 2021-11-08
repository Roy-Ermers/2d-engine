export type ComponentType<T extends Component<any>> = (new (...parameters: ConstructorParameters<typeof Component>) => T) & typeof Component;


export default class Component<t> {
    static readonly identifier: string = "Component";
    defaults?: t;

    constructor() { }
    start(attributes?: t): void { };
    destroy(attributes?: t): void { };
    update(attributes?: t): void { };
}