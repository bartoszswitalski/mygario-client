import { takeUntil } from 'rxjs';
import { RenderableFeature, Widget, WidgetFeature } from 'src/widgets/models/widget';
import { ComponentDataState } from 'src/widgets/states';

export class TransformFeature implements RenderableFeature {
    static readonly type = WidgetFeature.Transform;

    constructor(private readonly _widget: Widget, private readonly _componentDataState: ComponentDataState) {}

    render(): void {
        this._componentDataState
            .transform$(this._widget.id)
            .pipe(takeUntil(this._widget.destroy$))
            .subscribe(({ x, y, scale }) => {
                this._widget.container.setTransform(x, y, scale);
            });
    }
}
