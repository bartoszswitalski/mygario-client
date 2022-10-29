import { RenderableFeature, WidgetFeatures } from '../../widget/widget.model';
import { Widget } from '../../widget/widget';
import { combineLatest, takeUntil } from 'rxjs';
import { SizeQuery } from '../../application/query/size.query';
import { ColorQuery } from '../../application/query/color.query';
import { applicationBus } from '../../../infrastructure/eda';
import { BoardDestroyedEvent } from '../../../core/events/board-destroyed.event';
import { Graphics } from 'pixi.js';

export class PelletFeature implements RenderableFeature {
    static readonly type = WidgetFeatures.Pellet;

    readonly #pelletGraphics: Graphics;

    constructor(private readonly widget: Widget) {
        this.#pelletGraphics = new Graphics();
        this.widget.container.addChild(this.#pelletGraphics);
    }

    render(): void {
        this._observeWidgetQuery();
    }

    private _observeWidgetQuery(): void {
        combineLatest([SizeQuery.size$(this.widget.id), ColorQuery.color$(this.widget.id)])
            .pipe(takeUntil(applicationBus.on(BoardDestroyedEvent)))
            .subscribe(([size, color]) => {
                this._renderPellet(size, color);
            });
    }

    private _renderPellet(size: number, color: number): void {
        this.#pelletGraphics.clear();
        this.#pelletGraphics.beginFill(color);
        this.#pelletGraphics.drawCircle(0, 0, size);
        this.#pelletGraphics.endFill();
    }
}
