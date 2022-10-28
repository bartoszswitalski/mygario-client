import { ApplicationEventHandler, commandBus } from '../../core/eda';
import { BoardDestroyedEvent } from '../../core/events/board-destroyed.event';
import { WidgetsDisposeStoragesCommand } from '../../widgets/application/command/widgets-dispose-storages.command';

export class BoardDestroyedEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardDestroyedEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(events: BoardDestroyedEvent[]): void {
        commandBus.dispatch(new WidgetsDisposeStoragesCommand());
    }
}
