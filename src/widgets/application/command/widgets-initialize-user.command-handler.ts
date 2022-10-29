import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsInitializeUserCommand } from './widgets-initialize-user.command';

export class WidgetsInitializeUserCommandHandler implements CommandHandler {
    command = WidgetsInitializeUserCommand;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(command: WidgetsInitializeUserCommand): void {
        // todo
    }
}
