import { ApplicationEvent } from '../../infrastructure/eda';
import { uuid } from '../types/uuid';

export class PlayerRemovedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            playerId: uuid;
        },
    ) {
        super();
    }
}
