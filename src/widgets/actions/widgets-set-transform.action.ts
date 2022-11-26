import { DispatcherAction } from 'src/infrastructure/eda';

export class SetTransformAction extends DispatcherAction {
    constructor(
        public readonly payload: {
            widgetId: string;
            data: {
                x: number;
                y: number;
                scale: number;
            };
        },
    ) {
        super(payload);
    }
}
