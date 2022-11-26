import { ServerToClientMessage, ServerToClientPayloads } from 'src/common/models/sync';

export interface SyncService {
    addMessageListener: <T extends ServerToClientMessage>(
        messageType: T,
        listenerCallback: (messagePayload: ServerToClientPayloads[T]) => void,
    ) => void;
}
