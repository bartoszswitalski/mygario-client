import { AbstractRenderer, Renderer } from '@pixi/core';
import { injectable } from 'inversify';
import * as PIXI from 'pixi.js';
import { PixiCanvasApplication } from 'src/pixi/models/pixi-application.model';
import { PixiApplicationBackground } from './pixi-application-background';

@injectable()
export class PixiApplication implements PixiCanvasApplication {
    private static readonly APP_BACKGROUND_COLOR = 0x000000;
    private static readonly APP_BACKGROUND_ALPHA = 0.1;

    readonly #app: PIXI.Application;
    readonly #mainContainer: PIXI.Container;
    readonly #background: PixiApplicationBackground;

    constructor() {
        this.#app = this._getPixiApplication();

        this.#mainContainer = this._getMainPixiContainer();
        this.#app.stage.addChild(this.#mainContainer);

        this.#background = this._getApplicationBackground();
        this.#mainContainer.addChild(this.#background);
    }

    _getPixiApplication(): PIXI.Application {
        return new PIXI.Application({
            backgroundColor: PixiApplication.APP_BACKGROUND_COLOR,
            backgroundAlpha: PixiApplication.APP_BACKGROUND_ALPHA,
            resizeTo: window,
            antialias: true,
        });
    }

    _getApplicationBackground(): PixiApplicationBackground {
        return new PixiApplicationBackground(this.#app.renderer.width, this.#app.renderer.height);
    }

    _getMainPixiContainer(): PIXI.Container {
        const container = new PIXI.Container();
        container.interactive = true;
        return container;
    }

    get renderer(): Renderer | AbstractRenderer {
        return this.#app.renderer;
    }

    get mainContainer(): PIXI.Container {
        return this.#mainContainer;
    }

    get ticker(): PIXI.Ticker {
        return this.#app.ticker;
    }

    get view(): HTMLCanvasElement {
        return this.#app.view;
    }

    destroy(): void {
        this.#app.destroy(true, {
            children: true,
            texture: true,
            baseTexture: true,
        });
    }
}
