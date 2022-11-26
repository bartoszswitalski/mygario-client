import { uuid } from 'src/core/types/uuid';
import { SetZIndexAction } from 'src/widgets/actions/widgets-set-z-index.action';

export function zIndexComponentAction({ zIndex = 1 }) {
    return (widgetId: uuid) => new SetZIndexAction({ widgetId, data: { zIndex } });
}
