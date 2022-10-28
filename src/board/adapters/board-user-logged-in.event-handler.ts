import { applicationBus, ApplicationEventHandler, commandBus } from '../../core/eda';
import { BoardUserLoggedInEvent } from '../../core/events/board-user-logged-in.event';
import { getPIXIApp } from '../../pixi/pixi-application';
import { BoardCursorMovedEvent } from '../../core/events/board-cursor-moved.event';
import { WidgetsCameraFollowPlayerCommand } from '../../widgets/application/command/widgets-camera-follow-player.command';
import { authStore } from '../../store/store';
import { uuid } from '../../core/types/uuid';

export class BoardUserLoggedInEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardUserLoggedInEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(events: BoardUserLoggedInEvent[]): void {
        getPIXIApp().ticker.add(() => {
            const { x, y } = getPIXIApp().renderer.plugins.interaction.mouse.global;
            applicationBus.dispatch(new BoardCursorMovedEvent({ x, y }));
        });

        const { userId } = authStore.getState();
        commandBus.dispatch(new WidgetsCameraFollowPlayerCommand({ playerId: userId as uuid }));
    }
}
