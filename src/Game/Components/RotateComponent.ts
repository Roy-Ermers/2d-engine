import RenderComponent from '@/Components/RenderComponent';
import { Entity } from 'Engine';

export default class RotateComponent extends RenderComponent {

    override defaults = {
        rotationSpeed: 1
    };

    override render(attributes: this["defaults"], entity: Entity) {
        entity.transform.rotation += attributes.rotationSpeed;
    }

}