import { inject, injectable } from 'inversify';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { DisposeWidgetsAction } from 'src/widgets/actions/widgets-dispose-widgets.action';

@injectable()
export class DisposeWidgetsActionCreator implements ActionCreator {
    constructor(@inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher) {}

    create(): void {
        this._dispatcher.dispatch(new DisposeWidgetsAction({}));
    }
}

export const DISPOSE_WIDGETS_ACTION_CREATOR = Symbol('DISPOSE_WIDGETS_ACTION_CREATOR');
