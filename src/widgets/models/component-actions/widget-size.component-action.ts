import { uuid } from 'src/core/types/uuid';
import { SetSizeAction } from 'src/widgets/actions/widgets-set-size.action';

export function sizeComponentAction({ size = 0 }) {
    return (widgetId: uuid) => new SetSizeAction({ widgetId, data: { size } });
}
