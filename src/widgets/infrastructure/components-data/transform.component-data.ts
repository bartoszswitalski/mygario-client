import { uuid } from '../../../core/types/uuid';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export function transformComponentData({ x = 0, y = 0, scale = 1 }) {
    return (widgetId: uuid) => {
        componentsDataAggregate.setComponentData(WidgetComponentData.Transform, widgetId, { x, y, scale });
    };
}
