import { ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { PlayerRemovedEvent } from '../../core/events/player-removed.event';
import { WidgetsPlayerRemoveCommand } from '../application/command/widgets-player-remove.command';

export class WidgetsPlayerRemovedEventHandler implements ApplicationEventHandler {
    eventsClasses = [PlayerRemovedEvent];

    handle([event]: PlayerRemovedEvent[]): void {
        const { userName } = event.payload;
        commandBus.dispatch(new WidgetsPlayerRemoveCommand({ userName }));
    }
}
