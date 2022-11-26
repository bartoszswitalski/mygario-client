import * as PIXI from 'pixi.js';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from 'src/pixi/pixi-application.constants';

export class PixiApplicationBackground extends PIXI.Graphics {
    static readonly #LINE_COLOR = 0x969696;
    static readonly #LINE_WIDTH = 1;
    static readonly #LINES_INTERVAL = 100;

    constructor(readonly _width: number, readonly _height: number) {
        super();
        this._drawBackground();
    }

    private _drawBackground(): void {
        this.lineStyle(PixiApplicationBackground.#LINE_WIDTH, PixiApplicationBackground.#LINE_COLOR);

        for (let x = X_MIN; x <= X_MAX; x += PixiApplicationBackground.#LINES_INTERVAL) {
            this.moveTo(x, Y_MIN).lineTo(x, Y_MAX);
        }
        for (let y = Y_MIN; y < Y_MAX; y += PixiApplicationBackground.#LINES_INTERVAL) {
            this.moveTo(X_MIN, y).lineTo(X_MAX, y);
        }

        [Y_MIN, Y_MAX].forEach((y) => this.moveTo(X_MIN, y).lineTo(X_MAX, y));
        [X_MIN, X_MAX].forEach((x) => this.moveTo(x, Y_MIN).lineTo(x, Y_MAX));
    }
}
