import { Graphics } from 'pixi.js';
import { combineLatest, takeUntil } from 'rxjs';
import { RenderableFeature, Widget, WidgetFeature } from 'src/widgets/models/widget';
import { ComponentDataState } from 'src/widgets/states/widgets-component-data.state';

export class PelletFeature implements RenderableFeature {
    static readonly type = WidgetFeature.Pellet;

    readonly #pelletGraphics: Graphics;

    constructor(private readonly _widget: Widget, private readonly _componentDataState: ComponentDataState) {
        this.#pelletGraphics = new Graphics();
        this._widget.container.addChild(this.#pelletGraphics);
    }

    render(): void {
        this._observeWidgetQuery();
    }

    private _observeWidgetQuery(): void {
        combineLatest([
            this._componentDataState.size$(this._widget.id),
            this._componentDataState.color$(this._widget.id),
        ])
            .pipe(takeUntil(this._widget.destroy$))
            .subscribe(([{ size }, { color }]) => {
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
