import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsPlayerRemoveCommand } from './widgets-player-remove.command';
import { widgetsAggregate } from '../../../infrastructure/aggregate/widgets.aggregate';

export class WidgetsPlayerRemoveCommandHandler implements CommandHandler {
    command = WidgetsPlayerRemoveCommand;

    handle(command: WidgetsPlayerRemoveCommand): void {
        const { userName } = command.payload;

        const userWidget = widgetsAggregate.get(userName);
        if (userWidget) {
            // todo: clear component data
            userWidget.destroy();
        }
    }
}
