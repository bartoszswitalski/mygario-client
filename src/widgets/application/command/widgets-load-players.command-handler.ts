import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsLoadPlayersCommand } from './widgets-load-players.command';

export class WidgetsLoadPlayersCommandHandler implements CommandHandler {
    command = WidgetsLoadPlayersCommand;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(command: WidgetsLoadPlayersCommand): void {
        // todo
    }
}
