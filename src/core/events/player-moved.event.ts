import { ApplicationEvent } from '../../infrastructure/eda';
import { uuid } from '../types/uuid';

export class PlayerMovedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            playerId: uuid;
            x: number;
            y: number;
            playerSize: number;
        },
    ) {
        super();
    }
}
