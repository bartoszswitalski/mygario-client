import { useEffect } from 'react';
import {
    DESTROY_BOARD_ACTION_CREATOR,
    DestroyBoardActionCreator,
} from 'src/board/action-creators/board-destroy-board.action-creator';
import { LoginModal } from 'src/board/views/LoginModal';
import { useInjection } from 'src/infrastructure/injection/use-injection';
import { PIXI_APP, PixiCanvasApplication } from 'src/pixi/models/pixi-application.model';
import { useWidgetsEraser, useWidgetsInitializer } from 'src/widgets/views/widgets';

export const Board = () => {
    const destroyBoardActionCreator = useInjection<DestroyBoardActionCreator>(DESTROY_BOARD_ACTION_CREATOR);
    const pixiApplication = useInjection<PixiCanvasApplication>(PIXI_APP);

    useWidgetsInitializer();
    useWidgetsEraser();

    useEffect(() => {
        document.body.appendChild(pixiApplication.view);

        return () => {
            destroyBoardActionCreator.create();
            pixiApplication.destroy();
        };
    }, []);

    return <LoginModal />;
};
