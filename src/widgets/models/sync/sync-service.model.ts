import { ServerToClientMessage, ServerToClientPayloads } from 'src/widgets/models/sync/index';

export interface SyncService {
    initialize: (token: string) => void;

    addMessageListener: <T extends ServerToClientMessage>(
        messageType: T,
        listenerCallback: (messagePayload: ServerToClientPayloads[T]) => void,
    ) => void;
}

export const SYNC_SERVICE = Symbol('SYNC_SERVICE');
