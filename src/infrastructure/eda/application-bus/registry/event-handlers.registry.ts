import { combineLatest, Subscription } from 'rxjs';
import { applicationBus } from 'infrastructure/eda/application-bus/application-bus';
import { ApplicationEventHandler } from 'infrastructure/eda/application-bus/application-bus.model';
import { InjectionToken } from 'infrastructure/injection/injection-token';

export class ApplicationEventHandlersRegistry {
    #subscriptions: Subscription = new Subscription();

    registerEventHandlers(eventHandlers: ApplicationEventHandler[]): void {
        eventHandlers.forEach((eventHandler) => this.#registerEventHandler(eventHandler));
    }

    #registerEventHandler(eventHandler: ApplicationEventHandler): void {
        this.#subscriptions.add(
            combineLatest(eventHandler.eventsClasses.map((eventClass) => applicationBus.on(eventClass))).subscribe(
                (events) => eventHandler.handle(events),
            ),
        );
    }

    dispose(): void {
        this.#subscriptions.unsubscribe();
    }
}

export const APPLICATION_EVENT_HANDLERS_REGISTRY = new InjectionToken('APPLICATION_EVENT_HANDLERS_REGISTRY');
