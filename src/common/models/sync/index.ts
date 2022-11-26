export type { SyncService } from './sync-service.model';
export { WEBSOCKET_SERVICE_URL, WEBSOCKET_SERVICE } from './websocket-service.model';
export type { WebsocketService } from './websocket-service.model';
export { ClientToServerMessage, ServerToClientMessage } from './sync.model';
export type {
    NewPlayerToClientPayload,
    MovePlayerToClientPayload,
    RemovePlayerToClientPayload,
    GrowPlayerToClientPayload,
    NewPlayerToServerPayload,
    MovePlayerToServerPayload,
    ClientToServerPayloads,
    ServerToClientPayloads,
} from './sync.model';
