import { DispatcherAction } from 'src/infrastructure/eda';

export class SetColorAction extends DispatcherAction {
    constructor(
        public readonly payload: {
            widgetId: string;
            data: {
                color: number;
            };
        },
    ) {
        super(payload);
    }
}
