import {
    GrowPlayerToClientPayload,
    MovePlayerToClientPayload,
    NewPlayerToClientPayload,
    RemovePlayerToClientPayload,
    ServerToClientMessage,
} from 'src/common/models/sync';
import { syncService } from 'src/common/services/sync/sync.service';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import {
    ADD_NEW_PLAYER_ACTION_CREATOR,
    GROW_PLAYER_ACTION_CREATOR,
    MOVE_PLAYER_ACTION_CREATOR,
    REMOVE_PLAYER_ACTION_CREATOR,
} from 'src/widgets/action-creators';

export const SYNC_ACTION_CREATORS_FACTORY = Symbol('SYNC_MESSAGES_ACTION_CREATORS_FACTORY');

export const listenSyncMessages = (actionCreatorsFactory: (symbol: symbol) => ActionCreator): void => {
    syncService.addMessageListener(
        ServerToClientMessage.NewPlayerToClient,
        handleNewPlayer(actionCreatorsFactory(ADD_NEW_PLAYER_ACTION_CREATOR)),
    );
    syncService.addMessageListener(
        ServerToClientMessage.MovePlayerToClient,
        handleMovePlayer(actionCreatorsFactory(MOVE_PLAYER_ACTION_CREATOR)),
    );
    syncService.addMessageListener(
        ServerToClientMessage.GrowPlayerToClient,
        handleGrowPlayer(actionCreatorsFactory(GROW_PLAYER_ACTION_CREATOR)),
    );
    syncService.addMessageListener(
        ServerToClientMessage.RemovePlayerToClient,
        handleRemovePlayer(actionCreatorsFactory(REMOVE_PLAYER_ACTION_CREATOR)),
    );
};

const handleNewPlayer =
    (actionCreator: ActionCreator) =>
    (payload: NewPlayerToClientPayload): void => {
        const {
            userName,
            position: { x, y },
            size,
            color,
        } = payload;
        console.log('WS New player', payload);
        actionCreator.create(userName, x, y, size, color);
    };

const handleMovePlayer =
    (actionCreator: ActionCreator) =>
    (payload: MovePlayerToClientPayload): void => {
        const {
            userName,
            playerTransform: { x, y },
            playerSize,
        } = payload;
        console.log('WS Move player', userName, x, y, playerSize);
        actionCreator.create(userName, x, y, playerSize);
    };

const handleGrowPlayer =
    (actionCreator: ActionCreator) =>
    (payload: GrowPlayerToClientPayload): void => {
        const { userName, playerSize } = payload;
        console.log('WS Grow player', userName, playerSize);
        actionCreator.create(userName, playerSize);
    };

const handleRemovePlayer =
    (actionCreator: ActionCreator) =>
    (payload: RemovePlayerToClientPayload): void => {
        const { userName } = payload;
        console.log('WS Remove player', userName);
        actionCreator.create(userName);
    };
