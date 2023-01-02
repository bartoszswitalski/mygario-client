import { useEffect } from 'react';
import { takeUntil, withLatestFrom } from 'rxjs';
import type { Camera } from 'src/camera/models';
import { APPLICATION_CAMERA } from 'src/camera/models';
import { AUTH_STATE, AuthState } from 'src/common/states/auth.state';
import { CURSOR_STATE, CursorState } from 'src/common/states/cursor.state';
import { uuid } from 'src/core/types/uuid';
import { useInjection } from 'src/infrastructure/injection/use-injection';
import type { PixiCanvasApplication } from 'src/pixi/models';
import { PIXI_APP } from 'src/pixi/models';
import {
    ADD_NEW_PLAYER_ACTION_CREATOR,
    AddNewPlayerActionCreator,
    MOVE_PLAYER_ACTION_CREATOR,
    MovePlayerActionCreator,
} from 'src/widgets/action-creators';
import { ClientToServerMessage, WEBSOCKET_SERVICE, WebsocketService } from 'src/widgets/models/sync';
import {
    COMPONENT_DATA_STATE,
    ComponentDataState,
    WIDGETS_STORAGE_STATE,
    WidgetsStorageState,
} from 'src/widgets/states';

export const useWidgetsInitializer = (): void => {
    const BASE_VELOCITY = 5;
    const DELTA_VELOCITY = 0.03;
    const VELOCITY_BORDER_RADIUS_MULTIPLE = 3;

    const widgetsStorageState = useInjection<WidgetsStorageState>(WIDGETS_STORAGE_STATE);
    const componentDataState = useInjection<ComponentDataState>(COMPONENT_DATA_STATE);
    const authState = useInjection<AuthState>(AUTH_STATE);
    const cursorState = useInjection<CursorState>(CURSOR_STATE);

    const pixiApp = useInjection<PixiCanvasApplication>(PIXI_APP);
    const camera = useInjection<Camera>(APPLICATION_CAMERA);

    const addNewPlayerActionCreator = useInjection<AddNewPlayerActionCreator>(ADD_NEW_PLAYER_ACTION_CREATOR);
    const movePlayerActionCreator = useInjection<MovePlayerActionCreator>(MOVE_PLAYER_ACTION_CREATOR);

    const websocketService = useInjection<WebsocketService>(WEBSOCKET_SERVICE);

    useEffect(() => {
        _observeWidgetAdded();
        _observeUserLoggedIn();
    }, []);

    const _observeWidgetAdded = (): void => {
        widgetsStorageState
            .addedWidget$()
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()))
            .subscribe((widget) => {
                pixiApp.mainContainer.addChild(widget.container);
                widget.render();
            });
    };

    const _observeUserLoggedIn = (): void => {
        authState
            .credentials$()
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()))
            .subscribe((credentials) => {
                const widgetId = credentials.userName;
                addNewPlayerActionCreator.create(widgetId, 0, 0, 50, 0x00ff00);
                _cameraFollowPlayer(widgetId);
                _playerFollowCursor(widgetId);
                _syncPlayerMove(widgetId);
            });
    };

    const _cameraFollowPlayer = (widgetId: uuid): void => {
        componentDataState
            .transform$(widgetId)
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()))
            .subscribe((transform) => {
                camera.setPosition(transform.x, transform.y, 1);
            });
    };

    const _playerFollowCursor = (widgetId: uuid): void => {
        cursorState
            .cursorCoords$()
            .pipe(
                takeUntil(widgetsStorageState.widgetsDisposed$()),
                withLatestFrom(componentDataState.size$(widgetId), componentDataState.transform$(widgetId)),
            )
            .subscribe(([cursorCoords, { size: playerSize }, playerCoords]) => {
                const { directionAngle, playerVelocity } = _getMoveParams(cursorCoords.x, cursorCoords.y, playerSize);
                const newPlayerX = playerCoords.x + Math.cos(directionAngle) * playerVelocity;
                const newPlayerY = playerCoords.y + Math.sin(directionAngle) * playerVelocity;
                movePlayerActionCreator.create(widgetId, newPlayerX, newPlayerY, playerSize);
            });
    };

    const _getMoveParams = (
        cursorX: number,
        cursorY: number,
        playerSize: number,
    ): { directionAngle: number; playerVelocity: number } => {
        const { width: viewportWidth, height: viewportHeight } = pixiApp.renderer;
        const deltaX = cursorX - viewportWidth / 2;
        const deltaY = cursorY - viewportHeight / 2;

        const directionAngle = Math.atan2(deltaY, deltaX);
        const playerVelocity = _getPlayerVelocity(deltaX, deltaY, playerSize);
        return { directionAngle, playerVelocity };
    };

    const _getPlayerVelocity = (deltaX: number, deltaY: number, playerSize: number): number => {
        const cursorDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const absoluteVelocity = BASE_VELOCITY - playerSize * DELTA_VELOCITY;
        const cursorPositionSlowFactor = Math.min(1, cursorDistance / (playerSize * VELOCITY_BORDER_RADIUS_MULTIPLE));
        return absoluteVelocity * cursorPositionSlowFactor;
    };

    const _syncPlayerMove = (widgetId: uuid): void => {
        componentDataState
            .transform$(widgetId)
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()), withLatestFrom(componentDataState.size$(widgetId)))
            .subscribe(([transform, { size }]) => {
                console.log('move player to server');
                websocketService.sendMessage(ClientToServerMessage.MovePlayerToServer, {
                    userName: widgetId,
                    playerTransform: transform,
                    playerSize: size,
                });
            });
    };
};
