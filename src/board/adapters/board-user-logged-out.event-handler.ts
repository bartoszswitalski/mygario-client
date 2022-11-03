import { ApplicationEventHandler } from '../../infrastructure/eda';
import { UserLoggedOutEvent } from '../../core/events/user-logged-out.event';

export class BoardUserLoggedOutEventHandler implements ApplicationEventHandler {
    eventsClasses = [UserLoggedOutEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    handle(events: UserLoggedOutEvent[]): void {}
}
