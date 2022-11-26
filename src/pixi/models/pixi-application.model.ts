import { AbstractRenderer, Renderer } from '@pixi/core';
import * as PIXI from 'pixi.js';

export type BoardConstraints = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};

export const BOARD_CONSTRAINTS = Symbol('BOARD_CONSTRAINTS');

export interface PixiCanvasApplication {
    get renderer(): Renderer | AbstractRenderer;

    get mainContainer(): PIXI.Container;

    get ticker(): PIXI.Ticker;

    get view(): HTMLCanvasElement;

    destroy(): void;
}

export const PIXI_APP = Symbol('PIXI_APP');
