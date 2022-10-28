import { RenderableFeature, WidgetFeatures } from '../../widget/widget.model';
import { Widget } from '../../widget/widget';
import { ZIndexQuery } from '../../application/query/z-index.query';
import { delay, takeUntil } from 'rxjs';
import { applicationBus } from '../../../core/eda';
import { BoardDestroyedEvent } from '../../../core/events/board-destroyed.event';

export class ZIndexFeature implements RenderableFeature {
    static readonly type = WidgetFeatures.ZIndex;

    constructor(private readonly widget: Widget) {}

    render(): void {
        ZIndexQuery.zIndex$(this.widget.id)
            .pipe(delay(0), takeUntil(applicationBus.on(BoardDestroyedEvent)))
            .subscribe((zIndex) => {
                this.widget.container.zIndex = zIndex;
            });
    }
}
