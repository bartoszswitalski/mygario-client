import { withProviders } from '../infrastructure/injection/providers';
import { ApplicationEventHandler } from '../infrastructure/eda';
import { Class } from '../core/types/class';
import { WEBSOCKET_SERVICE, WEBSOCKET_SERVICE_URL } from './model/websocket-service.model';
import { syncService } from './sync.service';
import { SyncUserLoggedInEventHandler } from './adapters/sync-user-logged-in.event-handler';

const eventProviders = [
    {
        provide: WEBSOCKET_SERVICE,
        useValue: {
            sendMessage: (messageType: string, payload: any) => {
                syncService.sendMessage(messageType as any, payload);
            },
        },
    },
    {
        provide: WEBSOCKET_SERVICE_URL,
        useValue: process.env.REACT_APP_BACKEND ?? 'http://localhost:3001/',
    },
];

const syncEventHandlers: Class<ApplicationEventHandler>[] = [SyncUserLoggedInEventHandler];

export const getSyncEventHandlers = () =>
    syncEventHandlers.map((handler) => withProviders<ApplicationEventHandler>(handler, eventProviders));
