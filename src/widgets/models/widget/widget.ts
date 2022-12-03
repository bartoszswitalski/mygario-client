import { Container } from 'pixi.js';
import { Observable, Subject } from 'rxjs';
import type { uuid } from 'src/core/types/uuid';
import { RenderableFeature } from 'src/widgets/models/widget/feature.model';

export class Widget {
    public container: Container = new Container();
    readonly #destroy = new Subject<boolean>();
    #features: Set<RenderableFeature> = new Set();

    constructor(public readonly id: uuid, private readonly _features: Set<(widget: Widget) => RenderableFeature>) {
        _features.forEach((RenderableFeature) => {
            this.#features.add(RenderableFeature(this));
        });
        this.container.sortableChildren = true;
        this.container.cullable = true;
    }

    get destroy$(): Observable<boolean> {
        return this.#destroy.asObservable();
    }

    render(): void {
        this.#features.forEach((feature) => feature.render());
    }

    destroy(): void {
        this.container.destroy();
        this.#destroy.next(true);
    }
}
