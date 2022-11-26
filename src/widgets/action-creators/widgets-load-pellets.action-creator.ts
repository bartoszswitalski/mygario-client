import { inject, injectable } from 'inversify';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import type { Dispatcher } from 'src/infrastructure/eda/dispatcher/dispatcher.model';
import { LoadPelletsAction } from 'src/widgets/actions/widgets-load-pellets.action';

@injectable()
export class LoadPelletsActionCreator implements ActionCreator {
    constructor(@inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher) {}

    create(): void {
        this._dispatcher.dispatch(new LoadPelletsAction({}));
    }
}

export const LOAD_PELLETS_ACTION_CREATOR = Symbol('LOAD_PELLETS_ACTION_CREATOR');
