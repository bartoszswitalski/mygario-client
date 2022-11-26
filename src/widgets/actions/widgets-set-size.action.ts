import { DispatcherAction } from 'src/infrastructure/eda';

export class SetSizeAction extends DispatcherAction {
    constructor(
        public readonly payload: {
            widgetId: string;
            data: {
                size: number;
            };
        },
    ) {
        super(payload);
    }
}
