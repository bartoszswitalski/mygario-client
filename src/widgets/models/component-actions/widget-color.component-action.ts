import { uuid } from 'src/core/types/uuid';
import { SetColorAction } from 'src/widgets/actions/widgets-set-color.action';

export function colorComponentAction({ color = 0x000000 }) {
    return (widgetId: uuid) => new SetColorAction({ widgetId, data: { color } });
}
