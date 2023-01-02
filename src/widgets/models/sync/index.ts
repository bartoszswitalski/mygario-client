export type { SyncService } from 'src/widgets/models/sync/sync-service.model';
export { SYNC_SERVICE } from 'src/widgets/models/sync/sync-service.model';
export { WEBSOCKET_SERVICE_URL, WEBSOCKET_SERVICE } from 'src/widgets/models/sync/websocket-service.model';
export type { WebsocketService } from 'src/widgets/models/sync/websocket-service.model';
export { ClientToServerMessage, ServerToClientMessage } from 'src/widgets/models/sync/sync.model';
export type {
    NewPlayerToClientPayload,
    MovePlayerToClientPayload,
    RemovePlayerToClientPayload,
    GrowPlayerToClientPayload,
    NewPlayerToServerPayload,
    MovePlayerToServerPayload,
    ClientToServerPayloads,
    ServerToClientPayloads,
} from 'src/widgets/models/sync/sync.model';
