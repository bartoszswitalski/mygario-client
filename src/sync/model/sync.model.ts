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
    userName: string;
    position: { x: number; y: number };
    size: number;
    color: number;
};

export type MovePlayerToClientPayload = {
    userName: string;
    playerTransform: { x: number; y: number };
    playerSize: number;
};

export type GrowPlayerToClientPayload = {
    userName: string;
    playerSize: number;
};

export type RemovePlayerToClientPayload = {
    userName: string;
};

export type NewPlayerToServerPayload = NewPlayerToClientPayload;

export type MovePlayerToServerPayload = MovePlayerToClientPayload;

export type ClientToServerPayloads = {
    [ClientToServerMessage.NewPlayerToServer]: NewPlayerToServerPayload;
    [ClientToServerMessage.MovePlayerToServer]: MovePlayerToServerPayload;
};

export type ServerToClientPayloads = {
    [ServerToClientMessage.NewPlayerToClient]: NewPlayerToClientPayload;
    [ServerToClientMessage.MovePlayerToClient]: MovePlayerToClientPayload;
    [ServerToClientMessage.GrowPlayerToClient]: GrowPlayerToClientPayload;
    [ServerToClientMessage.RemovePlayerToClient]: RemovePlayerToClientPayload;
};
