import { uuid } from '../../../core/types/uuid';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export class ColorQuery {
    static color$(widgetId: uuid): Observable<number> {
        return componentsDataAggregate.selectComponentData(WidgetComponentData.Color, widgetId).pipe(
            map((data) => data.color),
            distinctUntilChanged(),
        );
    }
}
