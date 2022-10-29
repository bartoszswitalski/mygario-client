import { WidgetsDisposeStoragesCommandHandler } from './application/command/widgets-dispose-storages.command-handler';
import { withProviders } from '../infrastructure/injection/providers';
import { CommandHandler } from '../infrastructure/eda';
import { InjectionToken } from '../infrastructure/injection';
import { WidgetsCameraFollowUserCommandHandler } from './application/command/widgets-camera-follow-user.command-handler';
import { WidgetsPlayerMoveCommandHandler } from './application/command/widgets-player-move.command-handler';
import { WidgetsInitializeUserCommandHandler } from './application/command/widgets-initialize-user.command-handler';
import { WidgetsLoadPelletsCommandHandler } from './application/command/widgets-load-pellets.command-handler';
import { WidgetsLoadPlayersCommandHandler } from './application/command/widgets-load-players.command-handler';

const handlerProviders: { provide: InjectionToken; useValue: unknown }[] = [];

const widgetsCommandHandlers = [
    WidgetsDisposeStoragesCommandHandler,
    WidgetsCameraFollowUserCommandHandler,
    WidgetsPlayerMoveCommandHandler,
    WidgetsInitializeUserCommandHandler,
    WidgetsLoadPelletsCommandHandler,
    WidgetsLoadPlayersCommandHandler,
];

export const getWidgetsCommandHandlers = () =>
    widgetsCommandHandlers.map((handler) => withProviders<CommandHandler>(handler, handlerProviders));
