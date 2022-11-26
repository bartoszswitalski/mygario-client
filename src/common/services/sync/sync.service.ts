import { io, Socket } from 'socket.io-client';
import {
    ClientToServerMessage,
    ClientToServerPayloads,
    ServerToClientMessage,
    ServerToClientPayloads,
} from 'src/common/models/sync';
import { SyncService } from 'src/common/models/sync/sync-service.model';
import { WebsocketService } from 'src/common/models/sync/websocket-service.model';

export let syncService: WssSyncService;
export const createSyncService = (token: string, baseUrl: string) => (syncService = new WssSyncService(token, baseUrl));

class WssSyncService implements SyncService, WebsocketService {
    readonly #socket: Socket;

    constructor(token: string, baseUrl: string) {
        this.#socket = io(baseUrl, {
            transports: ['websocket'],
            transportOptions: {
                websocket: { extraHeaders: { Authorization: token } },
            },
            query: { token },
        });
    }

    sendMessage<T extends ClientToServerMessage>(messageType: T, messagePayload: ClientToServerPayloads[T]): void {
        this.#socket.emit(messageType, messagePayload);
    }

    addMessageListener<T extends ServerToClientMessage>(
        messageType: T,
        listenerCallback: (messagePayload: ServerToClientPayloads[T]) => void,
    ): void {
        this.#socket.on(messageType, listenerCallback as any);
    }
}
