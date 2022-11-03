import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInjector } from 'infrastructure/injection';
import {
    APPLICATION_EVENT_HANDLERS_REGISTRY,
    ApplicationEventHandlersRegistry,
    COMMAND_HANDLERS_REGISTRY,
    CommandHandlersRegistry,
} from 'infrastructure/eda';
import { Board } from 'board/ui/Board';
import { getBoardCommandHandlers } from './board/board.command-handlers';
import { getWidgetsEventHandlers } from './widgets/widgets.event-handlers';
import { getWidgetsCommandHandlers } from './widgets/widgets.command-handlers';
import { getSyncEventHandlers } from './sync/sync.event-handlers';

export const App = () => {
    const [ready, setReady] = useState(false);
    const eventsHandlersRegistry = useInjector<ApplicationEventHandlersRegistry>(APPLICATION_EVENT_HANDLERS_REGISTRY);
    const commandsHandlersRegistry = useInjector<CommandHandlersRegistry>(COMMAND_HANDLERS_REGISTRY);

    useEffect(() => {
        eventsHandlersRegistry.registerEventHandlers([...getWidgetsEventHandlers(), ...getSyncEventHandlers()]);
        commandsHandlersRegistry.registerCommandHandlers([
            ...getBoardCommandHandlers(),
            ...getWidgetsCommandHandlers(),
        ]);
        setReady(true);

        return () => {
            eventsHandlersRegistry.dispose();
            commandsHandlersRegistry.dispose();
        };
    }, []);

    if (!ready) return null;

    return (
        <>
            <Board />
        </>
    );
};
