import { ApplicationEvent } from '../../infrastructure/eda';

export class PlayerRemovedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            userName: string;
        },
    ) {
        super();
    }
}
