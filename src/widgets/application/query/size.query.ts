import { uuid } from '../../../core/types/uuid';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';

export class SizeQuery {
    static size$(widgetId: uuid): Observable<number> {
        return componentsDataAggregate.selectComponentData(WidgetComponentData.Size, widgetId).pipe(
            map((data) => data.size),
            distinctUntilChanged(),
        );
    }
}
