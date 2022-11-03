import { ApplicationEvent } from '../../infrastructure/eda';
import { uuid } from '../types/uuid';

export class PlayerAddedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            playerId: uuid;
        },
    ) {
        super();
    }
}
