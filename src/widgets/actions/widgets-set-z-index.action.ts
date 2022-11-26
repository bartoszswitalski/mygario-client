import { DispatcherAction } from 'src/infrastructure/eda';

export class SetZIndexAction extends DispatcherAction {
    constructor(
        public readonly payload: {
            widgetId: string;
            data: {
                zIndex: number;
            };
        },
    ) {
        super(payload);
    }
}
