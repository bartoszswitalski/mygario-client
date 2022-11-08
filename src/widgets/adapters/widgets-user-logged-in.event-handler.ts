import { ApplicationEventHandler, commandBus } from '../../infrastructure/eda';
import { UserLoggedInEvent } from '../../core/events/user-logged-in.event';
import { WidgetsCameraFollowUserCommand } from '../application/command/widgets-camera-follow-user.command';
import { authStore } from '../../store/store';
import { WidgetsInitializeUserCommand } from '../application/command/widgets-initialize-user.command';

export class WidgetsUserLoggedInEventHandler implements ApplicationEventHandler {
    eventsClasses = [UserLoggedInEvent];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(events: UserLoggedInEvent[]): void {
        const { userName } = authStore.getState();
        commandBus.dispatch(new WidgetsInitializeUserCommand({ userName: userName as string }));
        commandBus.dispatch(new WidgetsCameraFollowUserCommand({ userName: userName as string }));
    }
}
