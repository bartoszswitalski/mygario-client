import { io, Socket } from 'socket.io-client';
import {
    ClientToServerMessage,
    ClientToServerPayloads,
    ServerToClientMessage,
    ServerToClientPayloads,
} from './model/sync.model';
import { WebsocketService } from './model/websocket-service.model';
import { SyncService } from './model/sync-service.model';

export let syncService: WssSyncService;
export const createSyncService = (token: string, baseUrl: string): SyncService => new WssSyncService(token, baseUrl);

class WssSyncService implements SyncService, WebsocketService {
    #socket: Socket;

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
