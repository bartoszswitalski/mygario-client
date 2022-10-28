import { Container } from 'pixi.js';
import { RenderableFeature, WidgetFeatures } from './widget.model';
import { Class } from '../../core/types/class';
import { getMainPIXIContainer } from '../../pixi/pixi-application';
import { uuid } from '../../core/types/uuid';
import { Blueprint } from '../domain/blueprint.model';

export class Widget {
    public container: Container = new Container();
    #features: Map<WidgetFeatures, RenderableFeature> = new Map();

    constructor(public readonly id: uuid, private readonly _features: Class<RenderableFeature>[]) {
        _features.forEach((WidgetFeature) => {
            this.#features.set((WidgetFeature as unknown as { type: WidgetFeatures }).type, new WidgetFeature(this));
        });
        getMainPIXIContainer().addChild(this.container);
        this.container.sortableChildren = true;
        this.container.cullable = true;
    }

    init(): void {
        this.render();
    }

    render(): void {
        this.#features.forEach((feature) => feature.render());
    }

    destroy(): void {
        this.container.destroy();
        getMainPIXIContainer().removeChild(this.container);
    }
}

export function createWidget(id: uuid, { components, features }: Blueprint): Widget {
    const widget = new Widget(id, features);
    components.forEach((componentData) => componentData(id));
    return widget;
}
