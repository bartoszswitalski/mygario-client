import { inject, injectable } from 'inversify';
import { Camera } from 'src/camera/models';
import type { PixiCanvasApplication } from 'src/pixi/models/pixi-application.model';
import { PIXI_APP } from 'src/pixi/models/pixi-application.model';

@injectable()
export class ApplicationCamera implements Camera {
    constructor(@inject(PIXI_APP) private readonly _pixiApp: PixiCanvasApplication) {}

    setPosition(x: number, y: number, scale: number): void {
        const { width, height } = this._pixiApp.renderer;
        this._pixiApp.mainContainer.setTransform(width / 2 - x, height / 2 - y);
        this._pixiApp.mainContainer.scale = { x: scale, y: scale };
    }

    getPosition(): { x: number; y: number } {
        return this._pixiApp.mainContainer.position;
    }
}

export const APPLICATION_CAMERA = Symbol('APPLICATION_CAMERA');
