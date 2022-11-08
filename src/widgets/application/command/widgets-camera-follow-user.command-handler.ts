import { applicationBus, CommandHandler } from '../../../infrastructure/eda';
import { WidgetsCameraFollowUserCommand } from './widgets-camera-follow-user.command';
import { TransformQuery } from '../query/transform.query';
import { takeUntil } from 'rxjs';
import { BoardDestroyedEvent } from '../../../core/events/board-destroyed.event';
import { camera } from '../../../camera/Camera';

export class WidgetsCameraFollowUserCommandHandler implements CommandHandler {
    command = WidgetsCameraFollowUserCommand;

    handle(command: WidgetsCameraFollowUserCommand): void {
        const { userName } = command.payload;
        TransformQuery.transform$(userName)
            .pipe(takeUntil(applicationBus.on(BoardDestroyedEvent)))
            .subscribe((transform) => {
                camera.setPosition(transform.x, transform.y, 1);
            });
    }
}
