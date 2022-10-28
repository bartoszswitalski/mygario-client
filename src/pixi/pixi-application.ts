import * as PIXI from 'pixi.js';
import { ApplicationBackground } from './application-background';

let PIXIApp: PixiApplication;
let mainPIXIContainer: PIXI.Container;

class PixiApplication {
    private static readonly APP_BACKGROUND_COLOR = 0x000000;
    private static readonly APP_BACKGROUND_ALPHA = 0.1;

    readonly #app: PIXI.Application;

    constructor() {
        this.#app = new PIXI.Application({
            backgroundColor: PixiApplication.APP_BACKGROUND_COLOR,
            backgroundAlpha: PixiApplication.APP_BACKGROUND_ALPHA,
            resizeTo: window,
            antialias: true,
        });
    }

    get app(): PIXI.Application {
        return this.#app;
    }
}

export const createPixiApplication = (): void => {
    PIXIApp = new PixiApplication();
    mainPIXIContainer = createMainPIXIContainer();
    const applicationBackground = new ApplicationBackground(PIXIApp.app.renderer.width, PIXIApp.app.renderer.height);
    mainPIXIContainer.addChild(applicationBackground);
    PIXIApp.app.stage.addChild(mainPIXIContainer);
};

const createMainPIXIContainer = (): PIXI.Container => {
    const pixiContainer = new PIXI.Container();
    pixiContainer.interactive = true;
    return pixiContainer;
};

export const getPIXIApp = (): PIXI.Application => {
    return PIXIApp.app;
};

export const getMainPIXIContainer = (): PIXI.Container => {
    return mainPIXIContainer;
};
