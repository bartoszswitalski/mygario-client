import { WidgetsDisposeStoragesCommandHandler } from './application/command/widgets-dispose-storages.command-handler';
import { withProviders } from '../infrastructure/injection/providers';
import { CommandHandler } from '../infrastructure/eda';
import { InjectionToken } from '../infrastructure/injection';
import { WidgetsCameraFollowUserCommandHandler } from './application/command/widgets-camera-follow-user.command-handler';
import { WidgetsPlayerMoveCommandHandler } from './application/command/widgets-player-move.command-handler';
import { WidgetsInitializeUserCommandHandler } from './application/command/widgets-initialize-user.command-handler';
import { WidgetsLoadPelletsCommandHandler } from './application/command/widgets-load-pellets.command-handler';
import { WIDGETS_FACTORY, WidgetsFactory } from './infrastructure/widgets.factory';
import { withRootProviders } from '../infrastructure/injection/root-injector';
import { WidgetsPlayerCreateCommandHandler } from './application/command/widgets-player-create.command-handler';
import { WidgetsPlayerGrowCommandHandler } from './application/command/widgets-player-grow.command-handler';
import { WidgetsPlayerRemoveCommandHandler } from './application/command/widgets-player-remove.command-handler';

const handlerProviders: { provide: InjectionToken; useValue: unknown }[] = [
    {
        provide: WIDGETS_FACTORY,
        useValue: withRootProviders(WidgetsFactory),
    },
];

const widgetsCommandHandlers = [
    WidgetsDisposeStoragesCommandHandler,
    WidgetsCameraFollowUserCommandHandler,
    WidgetsPlayerMoveCommandHandler,
    WidgetsPlayerGrowCommandHandler,
    WidgetsInitializeUserCommandHandler,
    WidgetsLoadPelletsCommandHandler,
    WidgetsPlayerCreateCommandHandler,
    WidgetsPlayerRemoveCommandHandler,
];

export const getWidgetsCommandHandlers = () =>
    widgetsCommandHandlers.map((handler) => withProviders<CommandHandler>(handler, handlerProviders));
