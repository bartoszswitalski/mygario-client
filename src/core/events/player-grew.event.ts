import { ApplicationEvent } from '../../infrastructure/eda';

export class PlayerGrewEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            userName: string;
            playerSize: number;
        },
    ) {
        super();
    }
}
