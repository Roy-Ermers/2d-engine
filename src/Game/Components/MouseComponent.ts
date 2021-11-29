import ShapeRendererComponent from '@/Components/ShapeRendererComponent';
import { pointInPolygon } from '@/Helpers';
import { Camera } from '@/Renderer';
import Game, { Color, Component, Entity, Mouse } from 'Engine';

export default class MouseComponent extends Component {
    override dependencies = [ShapeRendererComponent];

    override start(attributes: this['defaults'], entity: Entity): void {
    }

    override update(attributes: this['defaults'], entity: Entity): void {
        const shapes = entity.getComponent(ShapeRendererComponent);

        const mousePosition = Camera.cameraToWorldSpace(Mouse.position).minus(entity.transform.position);

        shapes.shapes.forEach(x => x.color = pointInPolygon(mousePosition, entity.bounds.complex) ? Color.red : Color.blue);
    }
}