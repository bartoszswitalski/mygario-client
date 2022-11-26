import { inject, injectable } from 'inversify';
import { clamp } from 'src/common/utils/utils';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import type { BoardConstraints } from 'src/pixi/models';
import { BOARD_CONSTRAINTS } from 'src/pixi/models';
import { SetTransformAction } from 'src/widgets/actions/widgets-set-transform.action';

@injectable()
export class MovePlayerActionCreator implements ActionCreator {
    constructor(
        @inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher,
        @inject(BOARD_CONSTRAINTS) private readonly _boardConstraints: BoardConstraints,
    ) {}

    create(userName: string, x: number, y: number, playerSize: number): void {
        const newX = clamp(this._boardConstraints.xMin + playerSize, this._boardConstraints.xMax - playerSize)(x);
        const newY = clamp(this._boardConstraints.yMin + playerSize, this._boardConstraints.yMax - playerSize)(y);

        this._dispatcher.dispatch(
            new SetTransformAction({
                widgetId: userName,
                data: { x: newX, y: newY, scale: 1 },
            }),
        );
    }
}

export const MOVE_PLAYER_ACTION_CREATOR = Symbol('MOVE_PLAYER_ACTION_CREATOR');
