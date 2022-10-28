import { uuid } from '../../../core/types/uuid';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export function sizeComponentData({ size = 0 }) {
    return (widgetId: uuid) => {
        componentsDataAggregate.setComponentData(WidgetComponentData.Size, widgetId, { size });
    };
}
