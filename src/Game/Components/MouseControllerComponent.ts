import RigidbodyComponent from '@/Components/RigidbodyComponent';
import { Component, Entity, Mouse, Vector2 } from 'Engine';


export default class MouseControllerComponent extends Component {

    override readonly dependencies = [RigidbodyComponent];

    override defaults = {
        speed: 1,
    };

    override update(attributes: this['defaults'], entity: Entity): void {
        const { speed } = attributes;
        const rigidbody = entity.getComponent(RigidbodyComponent)

        attributes.speed = Mouse.right ? 7.5 : 2.5;
        if (Mouse.middle)
            attributes.speed = Mouse.position.minus(entity.transform.position).length;

        rigidbody.velocity = Mouse.position.minus(entity.transform.position).normalize().multiply(speed);
    }

}