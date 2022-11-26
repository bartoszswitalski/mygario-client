import { inject, injectable } from 'inversify';
import { MoveCursorAction } from 'src/board/actions/move-cursor.action';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import type { PixiCanvasApplication } from 'src/pixi/models/pixi-application.model';
import { PIXI_APP } from 'src/pixi/models/pixi-application.model';

@injectable()
export class RegisterCursorActionCreator implements ActionCreator {
    constructor(
        @inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher,
        @inject(PIXI_APP) private readonly _pixiApp: PixiCanvasApplication,
    ) {}

    create(): void {
        this._pixiApp.ticker.add(() => {
            const { x, y } = this._pixiApp.renderer.plugins.interaction.mouse.global;
            this._dispatcher.dispatch(new MoveCursorAction({ x, y }));
        });
    }
}

export const REGISTER_CURSOR_ACTION_CREATOR = Symbol('REGISTER_CURSOR_ACTION_CREATOR');
