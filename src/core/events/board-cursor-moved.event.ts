import { ApplicationEvent } from '../../infrastructure/eda';

export class BoardCursorMovedEvent extends ApplicationEvent {
    constructor(
        public readonly payload: {
            x: number;
            y: number;
        },
    ) {
        super();
    }
}
