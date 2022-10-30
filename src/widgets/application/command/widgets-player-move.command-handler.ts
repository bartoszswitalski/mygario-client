import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsPlayerMoveCommand } from './widgets-player-move.command';
import {
    componentsDataAggregate,
    WidgetComponentData,
} from '../../../infrastructure/aggregate/component-data.aggregate';
import { clamp } from '../../../shared/utils';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from '../../../board/board.constants';

export class WidgetsPlayerMoveCommandHandler implements CommandHandler {
    command = WidgetsPlayerMoveCommand;

    handle(command: WidgetsPlayerMoveCommand): void {
        const { x: playerX, y: playerY, playerId, playerSize } = command.payload;
        const newX = clamp(X_MIN + playerSize, X_MAX - playerSize)(playerX);
        const newY = clamp(Y_MIN + playerSize, Y_MAX - playerSize)(playerY);

        componentsDataAggregate.setComponentData(WidgetComponentData.Transform, playerId, {
            x: newX,
            y: newY,
        });
    }
}
