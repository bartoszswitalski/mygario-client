import { WidgetsDisposeStoragesCommandHandler } from './application/command/widgets-dispose-storages.command-handler';
import { withProviders } from '../core/injection/providers';
import { CommandHandler } from '../core/eda';
import { InjectionToken } from '../core/injection';
import { WidgetsCameraFollowPlayerCommandHandler } from './application/command/widgets-camera-follow-player.command-handler';
import { WidgetsPlayerMoveCommandHandler } from './application/command/widgets-player-move.command-handler';

const handlerProviders: { provide: InjectionToken; useValue: unknown }[] = [];

const widgetsCommandHandlers = [
    WidgetsDisposeStoragesCommandHandler,
    WidgetsCameraFollowPlayerCommandHandler,
    WidgetsPlayerMoveCommandHandler,
];

export const getWidgetsCommandHandlers = () =>
    widgetsCommandHandlers.map((handler) => withProviders<CommandHandler>(handler, handlerProviders));
