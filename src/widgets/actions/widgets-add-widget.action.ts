import { DispatcherAction } from 'src/infrastructure/eda';
import { Widget } from 'src/widgets/models/widget';

export class AddWidgetAction extends DispatcherAction {
    constructor(public readonly payload: { widget: Widget }) {
        super(payload);
    }
}
