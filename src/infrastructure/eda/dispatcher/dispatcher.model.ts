import { Observable } from 'rxjs';
import { Class } from 'src/common/utils/class';

export interface Dispatcher {
    dispatch(action: DispatcherAction): void;

    on<T extends DispatcherAction>(action: Class<T>): Observable<T>;
}

export class DispatcherAction {
    constructor(public readonly payload: Record<string, unknown>) {}

    isEqual(eventType: any): boolean {
        return this instanceof eventType;
    }
}
