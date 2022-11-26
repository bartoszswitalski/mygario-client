import { DispatcherAction } from 'src/infrastructure/eda';

export class MoveCursorAction extends DispatcherAction {
    constructor(
        public readonly payload: {
            x: number;
            y: number;
        },
    ) {
        super(payload);
    }
}
