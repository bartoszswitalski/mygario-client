import { inject, injectable } from 'inversify';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { SetSizeAction } from 'src/widgets/actions/widgets-set-size.action';

@injectable()
export class GrowPlayerActionCreator implements ActionCreator {
    constructor(@inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher) {}

    create(userName: string, playerSize: number): void {
        this._dispatcher.dispatch(
            new SetSizeAction({
                widgetId: userName,
                data: { size: playerSize },
            }),
        );
    }
}

export const GROW_PLAYER_ACTION_CREATOR = Symbol('GROW_PLAYER_ACTION_CREATOR');
