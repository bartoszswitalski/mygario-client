import { ApplicationEvent } from '../../infrastructure/eda';

export class PlayerMovedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            userName: string;
            x: number;
            y: number;
            playerSize: number;
        },
    ) {
        super();
    }
}
