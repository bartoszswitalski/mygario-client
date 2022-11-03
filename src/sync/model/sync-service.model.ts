import { ServerToClientMessage, ServerToClientPayloads } from './sync.model';

export interface SyncService {
    addMessageListener: <T extends ServerToClientMessage>(
        messageType: T,
        listenerCallback: (messagePayload: ServerToClientPayloads[T]) => void,
    ) => void;
}
