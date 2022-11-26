import { inject, injectable } from 'inversify';
import { DisposeStoragesAction } from 'src/board/actions/dispose-storages.action';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';

@injectable()
export class DestroyBoardActionCreator implements ActionCreator {
    constructor(@inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher) {}

    create(): void {
        this._dispatcher.dispatch(new DisposeStoragesAction({}));
    }
}

export const DESTROY_BOARD_ACTION_CREATOR = Symbol('DESTROY_BOARD_ACTION_CREATOR');
