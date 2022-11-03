export enum ClientToServerMessage {
    NewPlayerToServer = 'newPlayerToServer',
    MovePlayerToServer = 'movePlayerToServer',
}

export enum ServerToClientMessage {
    NewPlayerToClient = 'newPlayerToClient',
    MovePlayerToClient = 'movePlayerToClient',
    GrowPlayerToClient = 'growPlayerToClient',
    RemovePlayerToClient = 'removePlayerToClient',
}

export type NewPlayerToClientPayload = {
    socketData: {
        playerId: string;
    };
};

export type MovePlayerToClientPayload = {
    socketData: {
        playerId: string;
        playerTransform: { x: number; y: number };
        playerSize: number;
    };
};

export type GrowPlayerToClientPayload = {
    socketData: {
        playerId: string;
        playerSize: number;
    };
};

export type RemovePlayerToClientPayload = {
    socketData: {
        playerId: string;
    };
};

export type ClientToServerPayloads = {
    [ClientToServerMessage.NewPlayerToServer]: NewPlayerToClientPayload['socketData'];
    [ClientToServerMessage.MovePlayerToServer]: MovePlayerToClientPayload['socketData'];
};

export type ServerToClientPayloads = {
    [ServerToClientMessage.NewPlayerToClient]: NewPlayerToClientPayload;
    [ServerToClientMessage.MovePlayerToClient]: MovePlayerToClientPayload;
    [ServerToClientMessage.GrowPlayerToClient]: GrowPlayerToClientPayload;
    [ServerToClientMessage.RemovePlayerToClient]: RemovePlayerToClientPayload;
};
