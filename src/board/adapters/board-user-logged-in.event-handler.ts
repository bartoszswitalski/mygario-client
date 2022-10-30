import { applicationBus, ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { BoardUserLoggedInEvent } from '../../core/events/board-user-logged-in.event';
import { getPIXIApp } from '../../pixi/pixi-application';
import { BoardCursorMovedEvent } from '../../core/events/board-cursor-moved.event';
import { WidgetsCameraFollowUserCommand } from '../../widgets/application/command/widgets-camera-follow-user.command';
import { authStore } from '../../store/store';
import { uuid } from '../../core/types/uuid';
import { WidgetsInitializeUserCommand } from '../../widgets/application/command/widgets-initialize-user.command';

export class BoardUserLoggedInEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardUserLoggedInEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(events: BoardUserLoggedInEvent[]): void {
        getPIXIApp().ticker.add(() => {
            const { x, y } = getPIXIApp().renderer.plugins.interaction.mouse.global;
            applicationBus.dispatch(new BoardCursorMovedEvent({ x, y }));
        });

        const { userName } = authStore.getState();
        commandBus.dispatch(new WidgetsInitializeUserCommand({ playerId: userName as uuid }));
        commandBus.dispatch(new WidgetsCameraFollowUserCommand({ playerId: userName as uuid }));
    }
}
