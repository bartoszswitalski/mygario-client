import { withProviders } from '../core/injection/providers';
import { ApplicationEventHandler } from '../core/eda';
import { InjectionToken } from '../core/injection';
import { BoardDestroyedEventHandler } from '../board/adapters/board-destroyed.event-handler';
import { WidgetsBoardCursorMovedEventHandler } from './adapters/widgets-board-cursor-moved.event-handler';
import { BoardUserLoggedInEventHandler } from '../board/adapters/board-user-logged-in.event-handler';
import { BoardUserLoggedOutEventHandler } from '../board/adapters/board-user-logged-out.event-handler';

const handlerProviders: { provide: InjectionToken; useValue: unknown }[] = [];

const widgetsEventHandlers = [
    BoardDestroyedEventHandler,
    WidgetsBoardCursorMovedEventHandler,
    BoardUserLoggedInEventHandler,
    BoardUserLoggedOutEventHandler,
];

export const getWidgetsEventHandlers = () =>
    widgetsEventHandlers.map((handler) => withProviders<ApplicationEventHandler>(handler, handlerProviders));
