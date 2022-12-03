import { inject, injectable } from 'inversify';
import { switchCase } from 'src/common/utils/utils';
import { WidgetType } from 'src/core/types/widget-type';
import { Blueprint } from 'src/widgets/models/blueprint/blueprint.model';
import { pelletInitActions } from 'src/widgets/models/init-actions/pellet.init-actions';
import { RawWidgetData, RenderableFeature, Widget, WidgetFeature } from 'src/widgets/models/widget';
import { FEATURES_FACTORY } from 'src/widgets/models/widget/feature.model';

@injectable()
export class WidgetsFactory {
    readonly #widgetsFeatures: Map<WidgetType, ((widget: Widget) => RenderableFeature)[]> = new Map([
        [
            WidgetType.Pellet,
            [WidgetFeature.Transform, WidgetFeature.Pellet, WidgetFeature.ZIndex].map(this._featuresFactory),
        ],
    ]);

    constructor(
        @inject(FEATURES_FACTORY)
        private readonly _featuresFactory: (feature: WidgetFeature) => (widget: Widget) => RenderableFeature,
    ) {}

    fromRaw(rawWidget: RawWidgetData): Blueprint {
        return switchCase({
            [WidgetType.Pellet]: {
                features: this.#widgetsFeatures.get(WidgetType.Pellet) ?? [],
                initActions: pelletInitActions(rawWidget),
            },
        })(rawWidget.type);
    }
}

export const WIDGETS_FACTORY = Symbol('WIDGETS_FACTORY');
