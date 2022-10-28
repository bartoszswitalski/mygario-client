import { InjectionToken, Injector } from '../../core/injection';
import { Blueprint } from '../domain/blueprint.model';
import { RawWidgetData } from '../../core/types/raw-widget-data';
import { switchCase } from '../../shared/utils';
import { WidgetType } from '../../core/types/widget-type';
import { Class } from '../../core/types/class';
import { RenderableFeature } from '../widget/widget.model';
import { TransformFeature } from '../ui/features/transform.feature';
import { ZIndexFeature } from '../ui/features/z-index.feature';
import { PelletFeature } from '../ui/features/pellet.feature';
import { pelletComponents } from './pellet.components';

export class WidgetsFactory {
    constructor(private readonly injector: Injector) {}

    static readonly #widgetsFeatures: Map<WidgetType, Class<RenderableFeature>[]> = new Map([
        [WidgetType.Pellet, [TransformFeature, ZIndexFeature, PelletFeature]],
    ]);

    fromRaw(rawWidget: RawWidgetData): Blueprint {
        return switchCase({
            [WidgetType.Pellet]: {
                features: WidgetsFactory.#widgetsFeatures.get(WidgetType.Pellet) ?? [],
                components: pelletComponents(rawWidget),
            },
        })(rawWidget.type);
    }
}

export const WIDGETS_FACTORY = new InjectionToken('WIDGETS_FACTORY');
