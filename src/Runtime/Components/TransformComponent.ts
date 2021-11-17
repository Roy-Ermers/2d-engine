import Component from '@/Data/Component';
import Vector2 from '@/Data/Vector2';

export default class TransformComponent extends Component {
    override defaults = {
        position: Vector2.zero,
        rotation: 0
    };
}