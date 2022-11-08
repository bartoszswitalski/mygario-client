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
    console.log('WS New player', payload);
    applicationBus.dispatch(new PlayerAddedEvent(payload));
};

const handleMovePlayer = (payload: MovePlayerToClientPayload): void => {
    const { userName, playerTransform, playerSize } = payload;
    const { x, y } = playerTransform;
    // console.log('WS Move player', userName, x, y, playerSize);
    applicationBus.dispatch(new PlayerMovedEvent({ userName, x, y, playerSize }));
};

const handleGrowPlayer = (payload: GrowPlayerToClientPayload): void => {
    const { userName, playerSize } = payload;
    console.log('WS Grow player', userName, playerSize);
    applicationBus.dispatch(new PlayerGrewEvent({ userName, playerSize }));
};

const handleRemovePlayer = (payload: RemovePlayerToClientPayload): void => {
    const { userName } = payload;
    console.log('WS Remove player', userName);
    applicationBus.dispatch(new PlayerRemovedEvent({ userName }));
};
