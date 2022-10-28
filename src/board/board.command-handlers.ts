import { BoardLoadBoardDataCommandHandler } from './application/commands/board-load-board-data.command-handler';
import { LOADS_BOARD_DATA } from './domain/loads-board-data';
import { withRootProviders } from '../core/injection/root-injector';
import { LoadsBoardDataHttpService } from './infrastructure/loads-board-data.http-service';
import { CommandHandler } from '../core/eda';
import { withProviders } from '../core/injection/providers';
import { WIDGETS_FACTORY, WidgetsFactory } from '../widgets/infrastructure/widgets.factory';

const handlerProviders = [
    {
        provide: LOADS_BOARD_DATA,
        useValue: withRootProviders(LoadsBoardDataHttpService),
    },
    {
        provide: WIDGETS_FACTORY,
        useValue: withRootProviders(WidgetsFactory),
    },
];

const boardCommandHandlers = [BoardLoadBoardDataCommandHandler];

export const getBoardCommandHandlers = () =>
    boardCommandHandlers.map((handler) => withProviders<CommandHandler>(handler, handlerProviders));
