import { uuid } from '../../../core/types/uuid';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export class ZIndexQuery {
    static zIndex$(widgetId: uuid): Observable<number> {
        return componentsDataAggregate.selectComponentData(WidgetComponentData.ZIndex, widgetId).pipe(
            map((data) => data.zIndex),
            distinctUntilChanged(),
        );
    }
}
