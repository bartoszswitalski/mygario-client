import { uuid } from 'src/core/types/uuid';
import { SetTransformAction } from 'src/widgets/actions/widgets-set-transform.action';

export function transformComponentAction({ x = 0, y = 0, scale = 1 }) {
    return (widgetId: uuid) => new SetTransformAction({ widgetId, data: { x, y, scale } });
}
