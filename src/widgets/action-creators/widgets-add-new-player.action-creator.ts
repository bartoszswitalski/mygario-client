import { inject, injectable } from 'inversify';
import { WidgetType } from 'src/core/types/widget-type';
import type { Dispatcher } from 'src/infrastructure/eda';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { AddWidgetAction } from 'src/widgets/actions';
import { Widget } from 'src/widgets/models/widget';
import { WIDGETS_FACTORY, WidgetsFactory } from 'src/widgets/models/widgets-factory';

@injectable()
export class AddNewPlayerActionCreator implements ActionCreator {
    constructor(
        @inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher,
        @inject(WIDGETS_FACTORY) private readonly _widgetsFactory: WidgetsFactory,
    ) {}

    create(userId: string, x: number, y: number, playerSize: number, playerColor: number): void {
        const { features, initActions } = this._widgetsFactory.fromRaw({
            x,
            y,
            size: playerSize,
            color: playerColor,
            scale: 1,
            zIndex: 1,
            type: WidgetType.Pellet,
        });
        const playerWidget = new Widget(userId, new Set(features));
        initActions.forEach((componentAction) => this._dispatcher.dispatch(componentAction(userId)));
        this._dispatcher.dispatch(new AddWidgetAction({ widget: playerWidget }));
    }
}

export const ADD_NEW_PLAYER_ACTION_CREATOR = Symbol('ADD_NEW_PLAYER_ACTION_CREATOR');
