import { uuid } from '../../../core/types/uuid';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export function colorComponentData({ color = 0x000000 }) {
    return (widgetId: uuid) => {
        componentsDataAggregate.setComponentData(WidgetComponentData.Color, widgetId, { color });
    };
}
