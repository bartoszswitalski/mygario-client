import { ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { PlayerMovedEvent } from '../../core/events/player-moved.event';
import { WidgetsPlayerMoveCommand } from '../application/command/widgets-player-move.command';

export class WidgetsPlayerMovedEventHandler implements ApplicationEventHandler {
    eventsClasses = [PlayerMovedEvent];

    handle([event]: PlayerMovedEvent[]): void {
        const { userName, x, y, playerSize } = event.payload;
        commandBus.dispatch(new WidgetsPlayerMoveCommand({ x, y, userName, playerSize }, true));
    }
}
