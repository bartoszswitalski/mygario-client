import { CommandHandler } from '../../../infrastructure/eda';
import { WidgetsPlayerCreateCommand } from './widgets-player-create.command';
import { Blueprint } from '../../domain/blueprint.model';
import { WIDGETS_FACTORY, WidgetsFactory } from '../../infrastructure/widgets.factory';
import { WidgetType } from '../../../core/types/widget-type';
import { createWidget } from '../../widget/widget';
import { widgetsAggregate } from '../../../infrastructure/aggregate/widgets.aggregate';
import { Injector } from '../../../infrastructure/injection';

export class WidgetsPlayerCreateCommandHandler implements CommandHandler {
    command = WidgetsPlayerCreateCommand;

    constructor(private readonly injector: Injector) {}

    handle(command: WidgetsPlayerCreateCommand): void {
        const { userName, position, size, color } = command.payload;

        const playerBlueprint: Blueprint = this.injector.get<WidgetsFactory>(WIDGETS_FACTORY).fromRaw({
            ...position,
            size,
            color,
            scale: 1,
            zIndex: 1,
            type: WidgetType.Pellet,
        });
        const playerWidget = createWidget(userName, playerBlueprint);
        widgetsAggregate.set(userName, playerWidget);
        playerWidget.init();
    }
}
