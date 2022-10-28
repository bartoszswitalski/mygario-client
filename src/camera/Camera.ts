import { getMainPIXIContainer, getPIXIApp } from '../pixi/pixi-application';
import { Coords } from '../core/types/coords';

class Camera {
    setPosition(x: number, y: number, scale: number): void {
        const { width, height } = getPIXIApp().renderer;
        getMainPIXIContainer().setTransform(width / 2 - x, height / 2 - y);
        getMainPIXIContainer().scale = { x: scale, y: scale };
    }

    getPosition(): Coords {
        return getMainPIXIContainer().position;
    }
}

export const camera = new Camera();
