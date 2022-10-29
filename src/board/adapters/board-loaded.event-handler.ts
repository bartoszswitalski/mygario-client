import { ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { BoardLoadedEvent } from '../../core/events/board-loaded.event';
import { WidgetsLoadPelletsCommand } from '../../widgets/application/command/widgets-load-pellets.command';
import { WidgetsLoadPlayersCommand } from '../../widgets/application/command/widgets-load-players.command';

export class BoardLoadedEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardLoadedEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle([event]: BoardLoadedEvent[]) {
        commandBus.dispatch(new WidgetsLoadPlayersCommand());
        commandBus.dispatch(new WidgetsLoadPelletsCommand());
    }
}
