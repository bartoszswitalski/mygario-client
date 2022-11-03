import { syncService } from './sync.service';
import {
    GrowPlayerToClientPayload,
    MovePlayerToClientPayload,
    NewPlayerToClientPayload,
    RemovePlayerToClientPayload,
    ServerToClientMessage,
} from './model/sync.model';
import { applicationBus } from '../infrastructure/eda';
import { PlayerAddedEvent } from '../core/events/player-added.event';
import { PlayerGrewEvent } from '../core/events/player-grew.event';
import { PlayerRemovedEvent } from '../core/events/player-removed.event';
import { PlayerMovedEvent } from '../core/events/player-moved.event';

export const listenSyncMessages = (): void => {
    syncService.addMessageListener(ServerToClientMessage.NewPlayerToClient, handleNewPlayer);
    syncService.addMessageListener(ServerToClientMessage.MovePlayerToClient, handleMovePlayer);
    syncService.addMessageListener(ServerToClientMessage.GrowPlayerToClient, handleGrowPlayer);
    syncService.addMessageListener(ServerToClientMessage.RemovePlayerToClient, handleRemovePlayer);
};

const handleNewPlayer = (payload: NewPlayerToClientPayload): void => {
    const { playerId } = payload.socketData;
    applicationBus.dispatch(new PlayerAddedEvent({ playerId }));
};

const handleMovePlayer = (payload: MovePlayerToClientPayload): void => {
    const { playerId, playerTransform, playerSize } = payload.socketData;
    const { x, y } = playerTransform;
    applicationBus.dispatch(new PlayerMovedEvent({ playerId, x, y, playerSize }));
};

const handleGrowPlayer = (payload: GrowPlayerToClientPayload): void => {
    const { playerId, playerSize } = payload.socketData;
    applicationBus.dispatch(new PlayerGrewEvent({ playerId, playerSize }));
};

const handleRemovePlayer = (payload: RemovePlayerToClientPayload): void => {
    const { playerId } = payload.socketData;
    applicationBus.dispatch(new PlayerRemovedEvent({ playerId }));
};
