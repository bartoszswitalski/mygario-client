import { Class } from '../../core/types/class';
import { RenderableFeature } from '../widget/widget.model';
import { uuid } from '../../core/types/uuid';

export interface Blueprint {
    features: Class<RenderableFeature>[];
    components: ((widgetId: uuid) => void)[];
}
