import { ApplicationEventHandler } from '../../infrastructure/eda';
import { UserLoggedInEvent } from '../../core/events/user-logged-in.event';
import { createSyncService } from '../sync.service';
import { authStore } from '../../store/store';
import { Injector } from '../../infrastructure/injection';
import { WEBSOCKET_SERVICE_URL } from '../model/websocket-service.model';
import { listenSyncMessages } from '../sync.listeners';

export class SyncUserLoggedInEventHandler implements ApplicationEventHandler {
    eventsClasses = [UserLoggedInEvent];

    constructor(private readonly injector: Injector) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle([event]: UserLoggedInEvent[]): void {
        const { token } = authStore.getState();
        createSyncService(token as string, this.injector.get<string>(WEBSOCKET_SERVICE_URL));
        listenSyncMessages();
    }
}
