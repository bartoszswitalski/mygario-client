import { WidgetsDisposeStoragesCommand } from './widgets-dispose-storages.command';
import { CommandHandler } from '../../../core/eda';
import { Injector } from '../../../core/injection';
import { widgetsAggregate } from '../../../infrastructure/aggregate/widgets.aggregate';
import { componentsDataAggregate } from '../../../infrastructure/aggregate/component-data.aggregate';

export class WidgetsDisposeStoragesCommandHandler implements CommandHandler {
    command = WidgetsDisposeStoragesCommand;

    constructor(private readonly injector: Injector) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(command: WidgetsDisposeStoragesCommand): void {
        widgetsAggregate.clear();
        componentsDataAggregate.dispose();
    }
}
