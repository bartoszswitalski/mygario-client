import { applicationBus, ApplicationEventHandler } from '../../infrastructure/eda';
import { UserLoggedInEvent } from '../../core/events/user-logged-in.event';
import { getPIXIApp } from '../../pixi/pixi-application';
import { BoardCursorMovedEvent } from '../../core/events/board-cursor-moved.event';

export class BoardUserLoggedInEventHandler implements ApplicationEventHandler {
    eventsClasses = [UserLoggedInEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(events: UserLoggedInEvent[]): void {
        getPIXIApp().ticker.add(() => {
            const { x, y } = getPIXIApp().renderer.plugins.interaction.mouse.global;
            applicationBus.dispatch(new BoardCursorMovedEvent({ x, y }));
        });
    }
}
