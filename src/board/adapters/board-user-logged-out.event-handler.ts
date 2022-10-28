import { ApplicationEventHandler } from '../../core/eda';
import { BoardUserLoggedOutEvent } from '../../core/events/board-user-logged-out.event';

export class BoardUserLoggedOutEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardUserLoggedOutEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    handle(events: BoardUserLoggedOutEvent[]): void {}
}
