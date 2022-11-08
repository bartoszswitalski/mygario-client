import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsPlayerMoveCommand } from './widgets-player-move.command';
import { clamp } from '../../../shared/utils';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from '../../../board/board.constants';
import { syncService } from '../../../sync/sync.service';
import { ClientToServerMessage } from '../../../sync/model/sync.model';
import { transformComponentData } from '../../infrastructure/components-data/transform.component-data';
import { sizeComponentData } from '../../infrastructure/components-data/size.component-data';

export class WidgetsPlayerMoveCommandHandler implements CommandHandler {
    command = WidgetsPlayerMoveCommand;

    handle(command: WidgetsPlayerMoveCommand): void {
        const { x: playerX, y: playerY, userName, playerSize } = command.payload;
        const newX = clamp(X_MIN + playerSize, X_MAX - playerSize)(playerX);
        const newY = clamp(Y_MIN + playerSize, Y_MAX - playerSize)(playerY);

        transformComponentData({ x: newX, y: newY })(userName);
        sizeComponentData({ size: playerSize })(userName);

        if (!command.withRemoteOrigin) {
            syncService.sendMessage(ClientToServerMessage.MovePlayerToServer, {
                userName: userName,
                playerTransform: { x: newX, y: newY },
                playerSize,
            });
        }
    }
}
