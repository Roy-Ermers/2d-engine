import RenderComponent from '@/Components/RenderComponent';

export default class RotateComponent extends RenderComponent {

    override defaults = {
        rotationSpeed: 1,
        rotation: 0
    };

    override render(attributes: this["defaults"]) {
        attributes.rotation += attributes.rotationSpeed;
    }

}