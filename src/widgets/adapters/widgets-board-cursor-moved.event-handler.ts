import { ApplicationEventHandler, commandBus } from '../../core/eda';
import { BoardCursorMovedEvent } from '../../core/events/board-cursor-moved.event';
import { WidgetsPlayerMoveCommand } from '../application/command/widgets-player-move.command';
import { getPIXIApp } from '../../pixi/pixi-application';
import { componentsDataAggregate, WidgetComponentData } from '../../infrastructure/aggregate/component-data.aggregate';
import { authStore } from '../../store/store';
import { uuid } from '../../core/types/uuid';

export class WidgetsBoardCursorMovedEventHandler implements ApplicationEventHandler {
    eventsClasses = [BoardCursorMovedEvent];

    private static readonly BASE_VELOCITY = 5;
    private static readonly DELTA_VELOCITY = 0.03;
    private static readonly VELOCITY_BORDER_RADIUS_MULTIPLE = 3;

    handle([event]: BoardCursorMovedEvent[]): void {
        const { userId } = authStore.getState();
        const { x: playerX, y: playerY } = componentsDataAggregate.getComponentData(
            WidgetComponentData.Transform,
            userId as uuid,
        );
        const { size: playerSize } = componentsDataAggregate.getComponentData(WidgetComponentData.Size, userId as uuid);

        const { directionAngle, playerVelocity } = this._getMoveParams(event.payload.x, event.payload.y, playerSize);
        const newPlayerX = this._getNewX(playerX, playerVelocity, directionAngle);
        const newPlayerY = this._getNewY(playerY, playerVelocity, directionAngle);

        commandBus.dispatch(new WidgetsPlayerMoveCommand({ x: newPlayerX, y: newPlayerY, playerId: userId as uuid }));
    }

    private _getMoveParams(
        cursorX: number,
        cursorY: number,
        playerSize: number,
    ): { directionAngle: number; playerVelocity: number } {
        const { width: viewportWidth, height: viewportHeight } = getPIXIApp().renderer;
        const deltaX = cursorX - viewportWidth / 2;
        const deltaY = cursorY - viewportHeight / 2;

        const directionAngle = Math.atan2(deltaY, deltaX);
        const playerVelocity = this._getPlayerVelocity(deltaX, deltaY, playerSize);
        return { directionAngle, playerVelocity };
    }

    private _getPlayerVelocity(deltaX: number, deltaY: number, playerSize: number): number {
        const cursorDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const absoluteVelocity =
            WidgetsBoardCursorMovedEventHandler.BASE_VELOCITY -
            playerSize * WidgetsBoardCursorMovedEventHandler.DELTA_VELOCITY;
        const cursorPositionSlowFactor = Math.min(
            1,
            cursorDistance / (playerSize * WidgetsBoardCursorMovedEventHandler.VELOCITY_BORDER_RADIUS_MULTIPLE),
        );
        return absoluteVelocity * cursorPositionSlowFactor;
    }

    private _getNewX = (oldX: number, directionAngle: number, playerVelocity: number): number => {
        return oldX + Math.cos(directionAngle) * playerVelocity;
    };

    private _getNewY = (oldY: number, directionAngle: number, playerVelocity: number): number => {
        return oldY + Math.sin(directionAngle) * playerVelocity;
    };
}