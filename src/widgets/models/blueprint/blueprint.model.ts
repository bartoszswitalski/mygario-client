import { uuid } from 'src/core/types/uuid';
import { DispatcherAction } from 'src/infrastructure/eda';
import { RenderableFeature, Widget } from 'src/widgets/models/widget';

export interface Blueprint {
    features: ((widget: Widget) => RenderableFeature)[];
    initActions: ((widgetId: uuid) => DispatcherAction)[];
}
