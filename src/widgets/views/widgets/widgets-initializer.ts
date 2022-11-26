import { useEffect } from 'react';
import { takeUntil } from 'rxjs';
import type { Camera } from 'src/camera/models';
import { APPLICATION_CAMERA } from 'src/camera/models';
import { AUTH_STATE, AuthState } from 'src/common/states/auth.state';
import { uuid } from 'src/core/types/uuid';
import { useInjection } from 'src/infrastructure/injection/use-injection';
import type { PixiCanvasApplication } from 'src/pixi/models';
import { PIXI_APP } from 'src/pixi/models';
import { ADD_NEW_PLAYER_ACTION_CREATOR, AddNewPlayerActionCreator } from 'src/widgets/action-creators';
import {
    COMPONENT_DATA_STATE,
    ComponentDataState,
    WIDGETS_STORAGE_STATE,
    WidgetsStorageState,
} from 'src/widgets/states';

export const useWidgetInitializer = (): void => {
    const widgetsStorageState = useInjection<WidgetsStorageState>(WIDGETS_STORAGE_STATE);
    const componentDataState = useInjection<ComponentDataState>(COMPONENT_DATA_STATE);
    const authState = useInjection<AuthState>(AUTH_STATE);
    const pixiApp = useInjection<PixiCanvasApplication>(PIXI_APP);
    const camera = useInjection<Camera>(APPLICATION_CAMERA);
    const addNewPlayerActionCreator = useInjection<AddNewPlayerActionCreator>(ADD_NEW_PLAYER_ACTION_CREATOR);

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
                addNewPlayerActionCreator.create(widgetId, 0, 0, 10, 0x00ff00);
                _cameraFollowWidget(widgetId);
            });
    };

    const _cameraFollowWidget = (widgetId: uuid): void => {
        componentDataState
            .transform$(widgetId)
            .pipe(takeUntil(widgetsStorageState.widgetsDisposed$()))
            .subscribe((transform) => {
                camera.setPosition(transform.x, transform.y, 1);
            });
    };
};
