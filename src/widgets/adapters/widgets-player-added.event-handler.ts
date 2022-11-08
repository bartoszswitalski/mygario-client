import { ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { PlayerAddedEvent } from '../../core/events/player-added.event';
import { WidgetsPlayerCreateCommand } from '../application/command/widgets-player-create.command';

export class WidgetsPlayerAddedEventHandler implements ApplicationEventHandler {
    eventsClasses = [PlayerAddedEvent];

    handle([event]: PlayerAddedEvent[]): void {
        commandBus.dispatch(new WidgetsPlayerCreateCommand(event.payload));
    }
}
