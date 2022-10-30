import { CommandHandler } from '../infrastructure/eda';
import { withProviders } from '../infrastructure/injection/providers';
import { Class } from '../core/types/class';
import { LOADS_BOARD_DATA } from './domain/loads-board-data';
import { withRootProviders } from '../infrastructure/injection/root-injector';
import { LoadsBoardDataHttpService } from './infrastructure/loads-board-data.http-service';

const handlerProviders = [
    {
        provide: LOADS_BOARD_DATA,
        useValue: withRootProviders(LoadsBoardDataHttpService),
    },
];

const boardCommandHandlers: Class<CommandHandler>[] = [];

export const getBoardCommandHandlers = () =>
    boardCommandHandlers.map((handler) => withProviders<CommandHandler>(handler, handlerProviders));
