import { ApplicationEvent } from '../../infrastructure/eda';

export class PlayerAddedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            userName: string;
            position: { x: number; y: number };
            size: number;
            color: number;
        },
    ) {
        super();
    }
}
