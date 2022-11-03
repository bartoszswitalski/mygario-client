import { ApplicationEvent } from '../../infrastructure/eda';
import { uuid } from '../types/uuid';

export class PlayerGrewEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            playerId: uuid;
            playerSize: number;
        },
    ) {
        super();
    }
}
