import { uuid } from '../../../core/types/uuid';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export function zIndexComponentData({ zIndex = 1 }) {
    return (widgetId: uuid) => {
        componentsDataAggregate.setComponentData(WidgetComponentData.ZIndex, widgetId, { zIndex });
    };
}
