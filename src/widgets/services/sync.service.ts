import { inject, injectable } from 'inversify';
import { io, Socket } from 'socket.io-client';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import {
    ClientToServerMessage,
    ClientToServerPayloads,
    ServerToClientMessage,
    ServerToClientPayloads,
    WEBSOCKET_SERVICE_URL,
} from 'src/widgets/models/sync';
import { SyncService } from 'src/widgets/models/sync/sync-service.model';
import { WebsocketService } from 'src/widgets/models/sync/websocket-service.model';
import { listenSyncMessages, SYNC_ACTION_CREATORS_FACTORY } from 'src/widgets/services/sync.listeners';

@injectable()
export class WssSyncService implements SyncService, WebsocketService {
    #socket: Socket = io();

    constructor(
        @inject(WEBSOCKET_SERVICE_URL) private readonly _baseUrl: string,
        @inject(SYNC_ACTION_CREATORS_FACTORY)
        private readonly _actionCreatorsFactory: (symbol: symbol) => ActionCreator,
    ) {}

    initialize(token: string): void {
        this._createSocketConnection(token);
        listenSyncMessages(this, this._actionCreatorsFactory);
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

    private _createSocketConnection(token: string): void {
        this.#socket = io(this._baseUrl, {
            transports: ['websocket'],
            transportOptions: {
                websocket: { extraHeaders: { Authorization: token } },
            },
            query: { token },
        });
    }
}

export const WSS_SYNC_SERVICE = Symbol('WSS_SYNC_SERVICE');
