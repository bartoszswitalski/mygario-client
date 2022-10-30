import { useEffect } from 'react';
import { createPixiApplication, getPIXIApp } from 'pixi/pixi-application';
import { applicationBus } from '../../infrastructure/eda';
import { BoardDestroyedEvent } from '../../core/events/board-destroyed.event';
import { BoardLoadedEvent } from '../../core/events/board-loaded.event';
import { LoginModal } from './LoginModal';
import { BoardUserLoggedOutEvent } from '../../core/events/board-user-logged-out.event';

export const Board = () => {
    useEffect(() => {
        createPixiApplication();
        const PIXIApp = getPIXIApp();
        document.body.appendChild(PIXIApp.view);

        applicationBus.dispatch(new BoardLoadedEvent());

        return () => {
            applicationBus.dispatch(new BoardUserLoggedOutEvent());
            applicationBus.dispatch(new BoardDestroyedEvent());
            PIXIApp.destroy(true, {
                children: true,
                texture: true,
                baseTexture: true,
            });
        };
    }, []);

    return <LoginModal />;
};
