import { useEffect } from 'react';
import { createPixiApplication, getPIXIApp } from 'pixi/pixi-application';
import { useAuth } from '../../auth/useAuth';
import { applicationBus, commandBus } from '../../core/eda';
import { BoardLoadBoardDataCommand } from '../application/commands/board-load-board-data.command';
import { BoardDestroyedEvent } from '../../core/events/board-destroyed.event';
import { BoardUserLoggedInEvent } from '../../core/events/board-user-logged-in.event';
import { BoardUserLoggedOutEvent } from '../../core/events/board-user-logged-out.event';

export const Board = () => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        createPixiApplication();
        const PIXIApp = getPIXIApp();
        document.body.appendChild(PIXIApp.view);

        commandBus.dispatch(new BoardLoadBoardDataCommand());

        return () => {
            applicationBus.dispatch(new BoardDestroyedEvent());
            PIXIApp.destroy(true, {
                children: true,
                texture: true,
                baseTexture: true,
            });
        };
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            applicationBus.dispatch(new BoardUserLoggedInEvent());
        } else {
            applicationBus.dispatch(new BoardUserLoggedOutEvent());
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return null;
    }

    // return <LoginModal />;
    return null;
};
