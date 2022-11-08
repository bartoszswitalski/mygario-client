import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsInitializeUserCommand } from './widgets-initialize-user.command';
import { Blueprint } from '../../domain/blueprint.model';
import { WIDGETS_FACTORY, WidgetsFactory } from '../../infrastructure/widgets.factory';
import { WidgetType } from '../../../core/types/widget-type';
import { Injector } from '../../../infrastructure/injection';
import { createWidget } from '../../widget/widget';
import { widgetsAggregate } from '../../../infrastructure/aggregate/widgets.aggregate';

export class WidgetsInitializeUserCommandHandler implements CommandHandler {
    command = WidgetsInitializeUserCommand;

    private static readonly BASE_SIZE = 30;

    constructor(private readonly injector: Injector) {}

    handle(command: WidgetsInitializeUserCommand): void {
        const { userName } = command.payload;
        const newUserColor = this._getRandomColor();

        const playerBlueprint: Blueprint = this.injector.get<WidgetsFactory>(WIDGETS_FACTORY).fromRaw({
            x: 0,
            y: 0,
            scale: 1,
            size: WidgetsInitializeUserCommandHandler.BASE_SIZE,
            color: newUserColor,
            zIndex: 1,
            type: WidgetType.Pellet,
        });
        const userWidget = createWidget(userName, playerBlueprint);
        widgetsAggregate.set(userName, userWidget);
        userWidget.init();
    }

    _getRandomColor(): number {
        return Math.floor(Math.random() * 16777215);
    }
}
