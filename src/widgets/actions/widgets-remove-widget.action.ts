import { DispatcherAction } from 'src/infrastructure/eda';

export class RemoveWidgetAction extends DispatcherAction {
    constructor(public readonly payload: { widgetId: string }) {
        super(payload);
    }
}
