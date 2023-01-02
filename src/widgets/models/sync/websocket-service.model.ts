import { ClientToServerMessage, ClientToServerPayloads } from 'src/widgets/models/sync/index';

export interface WebsocketService {
    sendMessage: <T extends ClientToServerMessage>(messageType: T, messagePayload: ClientToServerPayloads[T]) => void;
}

export const WEBSOCKET_SERVICE = Symbol('WEBSOCKET_SERVICE');
export const WEBSOCKET_SERVICE_URL = Symbol('WEBSOCKET_SERVICE_URL');
