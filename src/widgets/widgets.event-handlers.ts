import { withProviders } from '../infrastructure/injection/providers';
import { ApplicationEventHandler } from '../infrastructure/eda';
import { InjectionToken } from '../infrastructure/injection';
import { BoardDestroyedEventHandler } from '../board/adapters/board-destroyed.event-handler';
import { WidgetsBoardCursorMovedEventHandler } from './adapters/widgets-board-cursor-moved.event-handler';
import { BoardUserLoggedInEventHandler } from '../board/adapters/board-user-logged-in.event-handler';
import { BoardUserLoggedOutEventHandler } from '../board/adapters/board-user-logged-out.event-handler';
import { BoardLoadedEventHandler } from '../board/adapters/board-loaded.event-handler';
import { WidgetsPlayerAddedEventHandler } from './adapters/widgets-player-added.event-handler';
import { WidgetsPlayerMovedEventHandler } from './adapters/widgets-player-moved.event-handler';
import { WidgetsUserLoggedInEventHandler } from './adapters/widgets-user-logged-in.event-handler';
import { WidgetsPlayerRemovedEventHandler } from './adapters/widgets-player-removed.event-handler';

const handlerProviders: { provide: InjectionToken; useValue: unknown }[] = [];

const widgetsEventHandlers = [
    BoardLoadedEventHandler,
    BoardDestroyedEventHandler,
    WidgetsBoardCursorMovedEventHandler,
    WidgetsPlayerAddedEventHandler,
    WidgetsPlayerMovedEventHandler,
    WidgetsUserLoggedInEventHandler,
    WidgetsPlayerRemovedEventHandler,
    BoardUserLoggedInEventHandler,
    BoardUserLoggedOutEventHandler,
];

export const getWidgetsEventHandlers = () =>
    widgetsEventHandlers.map((handler) => withProviders<ApplicationEventHandler>(handler, handlerProviders));
