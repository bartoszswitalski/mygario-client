import { applicationBus, CommandHandler } from '../../../core/eda';
import { WidgetsCameraFollowPlayerCommand } from './widgets-camera-follow-player.command';
import { TransformQuery } from '../query/transform.query';
import { takeUntil } from 'rxjs';
import { BoardDestroyedEvent } from '../../../core/events/board-destroyed.event';
import { camera } from '../../../camera/Camera';

export class WidgetsCameraFollowPlayerCommandHandler implements CommandHandler {
    command = WidgetsCameraFollowPlayerCommand;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(command: WidgetsCameraFollowPlayerCommand): void {
        const { playerId } = command.payload;
        TransformQuery.transform$(playerId)
            .pipe(takeUntil(applicationBus.on(BoardDestroyedEvent)))
            .subscribe((transform) => {
                camera.setPosition(transform.x, transform.y, 1);
            });
    }
}
