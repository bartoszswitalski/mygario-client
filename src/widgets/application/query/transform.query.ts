import { uuid } from '../../../core/types/uuid';
import { distinctUntilChanged, Observable } from 'rxjs';
import {
    componentsDataAggregate,
    TransformComponentData,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export class TransformQuery {
    static transform$(widgetId: uuid): Observable<TransformComponentData> {
        return componentsDataAggregate
            .selectComponentData(WidgetComponentData.Transform, widgetId)
            .pipe(distinctUntilChanged());
    }

    static transform(widgetId: uuid): TransformComponentData {
        return componentsDataAggregate.getComponentData(WidgetComponentData.Transform, widgetId);
    }
}
