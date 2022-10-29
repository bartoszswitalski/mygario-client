import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsLoadPelletsCommand } from './widgets-load-pellets.command';

export class WidgetsLoadPelletsCommandHandler implements CommandHandler {
    command = WidgetsLoadPelletsCommand;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(command: WidgetsLoadPelletsCommand): void {
        // todo
    }
}
