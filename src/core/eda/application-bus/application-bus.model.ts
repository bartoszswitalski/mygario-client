import { Class } from 'core/types/class';

export class ApplicationEvent {
    isEqual(eventType: any): boolean {
        return this instanceof eventType;
    }
}

export interface ApplicationEventHandler {
    eventsClasses: Class<ApplicationEvent>[];

    handle(events: ApplicationEvent[]): void;
}
