import { RawPelletData } from '../../core/types/raw-widget-data';
import { transformComponentData } from './components-data/transform.component-data';
import { sizeComponentData } from './components-data/size.component-data';
import { colorComponentData } from './components-data/color.component-data';
import { zIndexComponentData } from './components-data/z-index.component-data';

export const pelletComponents = (pelletData: RawPelletData) => [
    transformComponentData({ x: pelletData.x, y: pelletData.y, scale: pelletData.scale }),
    sizeComponentData({ size: pelletData.size }),
    colorComponentData({ color: pelletData.color }),
    zIndexComponentData({ zIndex: pelletData.zIndex }),
];
