import { inject, injectable } from 'inversify';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { RemoveWidgetAction } from 'src/widgets/actions/widgets-remove-widget.action';

@injectable()
export class RemovePlayerActionCreator implements ActionCreator {
    constructor(@inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher) {}

    create(userName: string): void {
        this._dispatcher.dispatch(
            new RemoveWidgetAction({
                widgetId: userName,
            }),
        );
    }
}

export const REMOVE_PLAYER_ACTION_CREATOR = Symbol('REMOVE_PLAYER_ACTION_CREATOR');
