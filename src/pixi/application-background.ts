import * as PIXI from 'pixi.js';
import { X_MAX, X_MIN, Y_MAX, Y_MIN } from '../board/board.constants';

export class ApplicationBackground extends PIXI.Graphics {
    private static readonly LINE_COLOR = 0x969696;
    private static readonly LINE_WIDTH = 1;
    private static readonly LINES_INTERVAL = 100;

    constructor(readonly _width: number, readonly _height: number) {
        super();
        this.drawBackground();
    }

    private drawBackground(): void {
        this.lineStyle(ApplicationBackground.LINE_WIDTH, ApplicationBackground.LINE_COLOR);

        for (let x = X_MIN; x <= X_MAX; x += ApplicationBackground.LINES_INTERVAL) {
            this.moveTo(x, Y_MIN).lineTo(x, Y_MAX);
        }
        for (let y = Y_MIN; y < Y_MAX; y += ApplicationBackground.LINES_INTERVAL) {
            this.moveTo(X_MIN, y).lineTo(X_MAX, y);
        }

        [Y_MIN, Y_MAX].forEach((y) => this.moveTo(X_MIN, y).lineTo(X_MAX, y));
        [X_MIN, X_MAX].forEach((x) => this.moveTo(x, Y_MIN).lineTo(x, Y_MAX));
    }
}
