import { injectable } from 'inversify';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Class } from 'src/common/utils/class';
import { Dispatcher, DispatcherAction } from 'src/infrastructure/eda';

@injectable()
export class ApplicationDispatcher implements Dispatcher {
    readonly #bus = new Subject<DispatcherAction>();

    dispatch(action: DispatcherAction) {
        this.#bus.next(action);
    }

    on<T extends DispatcherAction>(action: Class<T>): Observable<T> {
        return this.#bus.pipe(filter((busAction) => busAction.isEqual(action))) as Observable<T>;
    }
}

export const APPLICATION_DISPATCHER = Symbol.for('APPLICATION_DISPATCHER');
