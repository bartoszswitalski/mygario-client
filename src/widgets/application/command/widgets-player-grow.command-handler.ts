import { CommandHandler } from '../../../infrastructure/eda';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';
import { WidgetsPlayerGrowCommand } from './widgets-player-grow.command';

export class WidgetsPlayerGrowCommandHandler implements CommandHandler {
    command = WidgetsPlayerGrowCommand;

    handle(command: WidgetsPlayerGrowCommand): void {
        const { playerId, playerSize } = command.payload;

        componentsDataAggregate.setComponentData(WidgetComponentData.Size, playerId, {
            size: playerSize,
        });
    }
}
