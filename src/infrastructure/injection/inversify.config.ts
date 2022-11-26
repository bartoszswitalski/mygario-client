import type { interfaces } from 'inversify';
import { Container } from 'inversify';
import {
    DESTROY_BOARD_ACTION_CREATOR,
    DestroyBoardActionCreator,
    REGISTER_CURSOR_ACTION_CREATOR,
    RegisterCursorActionCreator,
} from 'src/board/action-creators';
import { APPLICATION_CAMERA, ApplicationCamera, Camera } from 'src/camera/models';
import { AUTH_ACTION_CREATOR, AuthActionCreator } from 'src/common/action-creators/auth.action-creator';
import {
    WEBSOCKET_SERVICE,
    WEBSOCKET_SERVICE_URL,
    WebsocketService,
} from 'src/common/models/sync/websocket-service.model';
import { syncService } from 'src/common/services/sync/sync.service';
import { AUTH_STATE, AuthState } from 'src/common/states/auth.state';
import { switchCase } from 'src/common/utils/utils';
import { ApplicationDispatcher, Dispatcher } from 'src/infrastructure/eda';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from 'src/pixi';
import { BOARD_CONSTRAINTS, BoardConstraints, PIXI_APP, PixiCanvasApplication } from 'src/pixi/models';
import { PixiApplication } from 'src/pixi/pixi-application';

import {
    ADD_NEW_PLAYER_ACTION_CREATOR,
    AddNewPlayerActionCreator,
    GROW_PLAYER_ACTION_CREATOR,
    GrowPlayerActionCreator,
    LOAD_PELLETS_ACTION_CREATOR,
    LoadPelletsActionCreator,
    MOVE_PLAYER_ACTION_CREATOR,
    MovePlayerActionCreator,
    REMOVE_PLAYER_ACTION_CREATOR,
    RemovePlayerActionCreator,
} from 'src/widgets/action-creators';
import { RenderableFeature, Widget, WidgetFeature } from 'src/widgets/models/widget';
import { WIDGETS_FACTORY, WidgetsFactory } from 'src/widgets/models/widgets-factory';
import {
    COMPONENT_DATA_STATE,
    ComponentDataState,
    WIDGETS_STORAGE_STATE,
    WidgetsStorageState,
} from 'src/widgets/states';
import { PelletFeature } from 'src/widgets/views/features/pellet.feature';
import { TransformFeature } from 'src/widgets/views/features/transform.feature';
import { ZIndexFeature } from 'src/widgets/views/features/z-index.feature';

const dependenciesContainer = new Container();
dependenciesContainer.options.defaultScope = 'Singleton';

// flux eda
dependenciesContainer.bind<Dispatcher>(APPLICATION_DISPATCHER).to(ApplicationDispatcher);

// pixi
dependenciesContainer.bind<PixiCanvasApplication>(PIXI_APP).to(PixiApplication);

// camera
dependenciesContainer.bind<Camera>(APPLICATION_CAMERA).to(ApplicationCamera);

// common services
dependenciesContainer
    .bind<string>(WEBSOCKET_SERVICE_URL)
    .toConstantValue(process.env.REACT_APP_BACKEND ?? 'http://localhost:3001/');
dependenciesContainer.bind<WebsocketService>(WEBSOCKET_SERVICE).toConstantValue({
    sendMessage: (messageType: string, payload: any) => {
        syncService.sendMessage(messageType as any, payload);
    },
} as WebsocketService);

// common states
dependenciesContainer.bind<AuthState>(AUTH_STATE).to(AuthState);

// widgets states
dependenciesContainer.bind<ComponentDataState>(COMPONENT_DATA_STATE).to(ComponentDataState);
dependenciesContainer.bind<WidgetsStorageState>(WIDGETS_STORAGE_STATE).to(WidgetsStorageState);

// board constraints
dependenciesContainer.bind<BoardConstraints>(BOARD_CONSTRAINTS).toConstantValue({
    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX,
});

// widgets factory
dependenciesContainer.bind<WidgetsFactory>(WIDGETS_FACTORY).to(WidgetsFactory);

// common action creators
dependenciesContainer.bind<AuthActionCreator>(AUTH_ACTION_CREATOR).to(AuthActionCreator);

// board action creators
dependenciesContainer.bind<DestroyBoardActionCreator>(DESTROY_BOARD_ACTION_CREATOR).to(DestroyBoardActionCreator);
dependenciesContainer.bind<RegisterCursorActionCreator>(REGISTER_CURSOR_ACTION_CREATOR).to(RegisterCursorActionCreator);

// widgets action creators
dependenciesContainer.bind<LoadPelletsActionCreator>(LOAD_PELLETS_ACTION_CREATOR).to(LoadPelletsActionCreator);
dependenciesContainer.bind<AddNewPlayerActionCreator>(ADD_NEW_PLAYER_ACTION_CREATOR).to(AddNewPlayerActionCreator);
dependenciesContainer.bind<RemovePlayerActionCreator>(REMOVE_PLAYER_ACTION_CREATOR).to(RemovePlayerActionCreator);
dependenciesContainer.bind<GrowPlayerActionCreator>(GROW_PLAYER_ACTION_CREATOR).to(GrowPlayerActionCreator);
dependenciesContainer.bind<MovePlayerActionCreator>(MOVE_PLAYER_ACTION_CREATOR).to(MovePlayerActionCreator);

dependenciesContainer
    .bind<interfaces.Factory<RenderableFeature>>('FEATURES_FACTORY')
    .toFactory<RenderableFeature, [WidgetFeature], [Widget]>((context: interfaces.Context) => {
        return (feature) => (widget) => {
            const componentDataState = context.container.get<ComponentDataState>(COMPONENT_DATA_STATE);
            return switchCase({
                [WidgetFeature.Transform]: new TransformFeature(widget, componentDataState),
                [WidgetFeature.ZIndex]: new ZIndexFeature(widget, componentDataState),
                [WidgetFeature.Pellet]: new PelletFeature(widget, componentDataState),
            })(feature);
        };
    });

export { dependenciesContainer };