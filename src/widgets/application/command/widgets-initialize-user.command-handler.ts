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

    constructor(private readonly injector: Injector) {}

    handle(command: WidgetsInitializeUserCommand): void {
        const { playerId } = command.payload;

        const playerBlueprint: Blueprint = this.injector.get<WidgetsFactory>(WIDGETS_FACTORY).fromRaw({
            x: 0,
            y: 0,
            scale: 1,
            size: 50,
            color: 0xff0000,
            zIndex: 1,
            type: WidgetType.Pellet,
        });
        const userWidget = createWidget(playerId, playerBlueprint);
        widgetsAggregate.set(playerId, userWidget);
        userWidget.init();
    }
}
