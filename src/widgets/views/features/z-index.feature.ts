import { delay, takeUntil } from 'rxjs';
import { RenderableFeature, Widget, WidgetFeature } from 'src/widgets/models/widget';
import { ComponentDataState } from 'src/widgets/states/widgets-component-data.state';

export class ZIndexFeature implements RenderableFeature {
    static readonly type = WidgetFeature.ZIndex;

    constructor(private readonly _widget: Widget, private readonly _componentDataState: ComponentDataState) {}

    render(): void {
        this._componentDataState
            .zIndex$(this._widget.id)
            .pipe(delay(0), takeUntil(this._widget.destroy$))
            .subscribe(({ zIndex }) => {
                this._widget.container.zIndex = zIndex;
            });
    }
}
