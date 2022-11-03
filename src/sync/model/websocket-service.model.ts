import { InjectionToken } from '../../infrastructure/injection';
import { ClientToServerMessage, ClientToServerPayloads } from './sync.model';

export interface WebsocketService {
    sendMessage: <T extends ClientToServerMessage>(messageType: T, messagePayload: ClientToServerPayloads[T]) => void;
}

export const WEBSOCKET_SERVICE = new InjectionToken('WEBSOCKET_SERVICE');
export const WEBSOCKET_SERVICE_URL = new InjectionToken('WEBSOCKET_SERVICE_URL');
