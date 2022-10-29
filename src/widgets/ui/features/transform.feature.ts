import { RenderableFeature, WidgetFeatures } from '../../widget/widget.model';
import { Widget } from '../../widget/widget';
import { TransformQuery } from '../../application/query/transform.query';
import { takeUntil } from 'rxjs';
import { applicationBus } from '../../../infrastructure/eda';
import { BoardDestroyedEvent } from '../../../core/events/board-destroyed.event';

export class TransformFeature implements RenderableFeature {
    static readonly type = WidgetFeatures.Transform;

    constructor(private readonly widget: Widget) {}

    render(): void {
        TransformQuery.transform$(this.widget.id)
            .pipe(takeUntil(applicationBus.on(BoardDestroyedEvent)))
            .subscribe(({ x, y, scale }) => {
                this.widget.container.setTransform(x, y, scale, scale);
            });
    }
}
