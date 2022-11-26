import {
    colorComponentAction,
    sizeComponentAction,
    transformComponentAction,
    zIndexComponentAction,
} from 'src/widgets/models/component-actions';
import { RawPelletData } from 'src/widgets/models/widget';

export const pelletInitActions = (pelletData: RawPelletData) => [
    transformComponentAction({ x: pelletData.x, y: pelletData.y, scale: pelletData.scale }),
    sizeComponentAction({ size: pelletData.size }),
    colorComponentAction({ color: pelletData.color }),
    zIndexComponentAction({ zIndex: pelletData.zIndex }),
];
