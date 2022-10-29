import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ApplicationEvent } from 'infrastructure/eda/application-bus/application-bus.model';
import { Class } from 'core/types/class';

class ApplicationBus {
    readonly #bus = new Subject<ApplicationEvent>();

    dispatch(event: ApplicationEvent) {
        this.#bus.next(event);
    }

    on<T extends ApplicationEvent>(event: Class<T>): Observable<T> {
        return this.#bus.pipe(filter((busEvent) => busEvent.isEqual(event))) as Observable<T>;
    }
}

export const applicationBus = new ApplicationBus();
