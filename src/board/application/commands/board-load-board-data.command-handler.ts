import { CommandHandler } from '../../../core/eda';
import { BoardLoadBoardDataCommand } from './board-load-board-data.command';
import { widgetsAggregate } from '../../../infrastructure/aggregate/widgets.aggregate';
import { Blueprint } from '../../../widgets/domain/blueprint.model';
import { WIDGETS_FACTORY, WidgetsFactory } from '../../../widgets/infrastructure/widgets.factory';
import { Injector } from '../../../core/injection';
import { WidgetType } from '../../../core/types/widget-type';
import { createWidget } from '../../../widgets/widget/widget';

export class BoardLoadBoardDataCommandHandler implements CommandHandler {
    command = BoardLoadBoardDataCommand;

    constructor(private readonly injector: Injector) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(command: BoardLoadBoardDataCommand): Promise<void> {
        const widgetId = 'widgetId';
        const widgetBlueprint: Blueprint = this.injector.get<WidgetsFactory>(WIDGETS_FACTORY).fromRaw({
            x: 0,
            y: 0,
            scale: 1,
            size: 50,
            color: 0xff0000,
            zIndex: 1,
            type: WidgetType.Pellet,
        });
        const widgetId2 = 'widgetId2';
        const widgetBlueprint2: Blueprint = this.injector.get<WidgetsFactory>(WIDGETS_FACTORY).fromRaw({
            x: -200,
            y: -150,
            scale: 1,
            size: 30,
            color: 0xffff00,
            zIndex: 1,
            type: WidgetType.Pellet,
        });

        const widget = createWidget(widgetId, widgetBlueprint);
        const widget2 = createWidget(widgetId2, widgetBlueprint2);
        widgetsAggregate.set(widgetId, widget);
        widgetsAggregate.set(widgetId2, widget2);
        widgetsAggregate.forEach((widget) => widget.init());
    }
}
