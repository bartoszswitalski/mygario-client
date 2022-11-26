import {
    GrowPlayerToClientPayload,
    MovePlayerToClientPayload,
    NewPlayerToClientPayload,
    RemovePlayerToClientPayload,
    ServerToClientMessage,
} from 'src/common/models/sync';
import { syncService } from 'src/common/services/sync/sync.service';
import { useInjection } from 'src/infrastructure/injection/use-injection';
import {
    GROW_PLAYER_ACTION_CREATOR,
    GrowPlayerActionCreator,
} from 'src/widgets/action-creators/widgets-grow-player.action-creator';
import {
    MOVE_PLAYER_ACTION_CREATOR,
    MovePlayerActionCreator,
} from 'src/widgets/action-creators/widgets-move-player.action-creator';
import {
    REMOVE_PLAYER_ACTION_CREATOR,
    RemovePlayerActionCreator,
} from 'src/widgets/action-creators/widgets-remove-player.action-creator';

export const listenSyncMessages = (): void => {
    syncService.addMessageListener(ServerToClientMessage.NewPlayerToClient, handleNewPlayer);
    syncService.addMessageListener(ServerToClientMessage.MovePlayerToClient, handleMovePlayer);
    syncService.addMessageListener(ServerToClientMessage.GrowPlayerToClient, handleGrowPlayer);
    syncService.addMessageListener(ServerToClientMessage.RemovePlayerToClient, handleRemovePlayer);
};

const handleNewPlayer = (payload: NewPlayerToClientPayload): void => {
    const {
        userName,
        position: { x, y },
        size,
        color,
    } = payload;
    console.log('WS New player', payload);
    // useInjection<AddNewPlayerActionCreator>(ADD_NEW_PLAYER_ACTION_CREATOR).create(userName, x, y, size, color);
};

const handleMovePlayer = (payload: MovePlayerToClientPayload): void => {
    const {
        userName,
        playerTransform: { x, y },
        playerSize,
    } = payload;
    console.log('WS Move player', userName, x, y, playerSize);
    useInjection<MovePlayerActionCreator>(MOVE_PLAYER_ACTION_CREATOR).create(userName, x, y, playerSize);
};

const handleGrowPlayer = (payload: GrowPlayerToClientPayload): void => {
    const { userName, playerSize } = payload;
    console.log('WS Grow player', userName, playerSize);
    useInjection<GrowPlayerActionCreator>(GROW_PLAYER_ACTION_CREATOR).create(userName, playerSize);
};

const handleRemovePlayer = (payload: RemovePlayerToClientPayload): void => {
    const { userName } = payload;
    console.log('WS Remove player', userName);
    useInjection<RemovePlayerActionCreator>(REMOVE_PLAYER_ACTION_CREATOR).create(userName);
};
