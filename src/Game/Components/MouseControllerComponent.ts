import { Component, Mouse, Vector2 } from 'game';


export default class MouseControllerComponent extends Component {

    override get dependencies(): string[] {
        return ["Rigidbody"];
    }

    override defaults = {
        speed: 1,
        velocity: new Vector2(),
        position: new Vector2()
    };

    override update(attributes: this['defaults']): void {
        const { speed } = attributes;

        attributes.speed = Mouse.right ? 7.5 : 2.5;
        if (Mouse.middle)
            attributes.speed = Mouse.position.minus(attributes.position).length;

        attributes.velocity = Mouse.position.minus(attributes.position).normalize().multiply(speed);
    }

}