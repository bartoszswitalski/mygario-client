import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export enum WidgetComponentData {
    Transform,
    Size,
    ZIndex,
    Color,
}

export type TransformComponentData = {
    x: number;
    y: number;
    scale: number;
};

export type SizeComponentData = {
    size: number;
};

export type ZIndexComponentData = {
    zIndex: number;
};

export type ColorComponentData = {
    color: number;
};

type ComponentData = {
    [WidgetComponentData.Transform]: { [widgetId: string]: TransformComponentData };
    [WidgetComponentData.Size]: { [widgetId: string]: SizeComponentData };
    [WidgetComponentData.ZIndex]: { [widgetId: string]: ZIndexComponentData };
    [WidgetComponentData.Color]: { [widgetId: string]: ColorComponentData };
};

const componentDataInitialValue: ComponentData = {
    [WidgetComponentData.Transform]: {},
    [WidgetComponentData.Size]: {},
    [WidgetComponentData.ZIndex]: {},
    [WidgetComponentData.Color]: {},
};

class ComponentsDataAggregate {
    readonly #componentsData = new BehaviorSubject<ComponentData>(componentDataInitialValue);
    readonly #componentsData$ = this.#componentsData.asObservable();

    setComponentData<T extends keyof ComponentData>(
        component: T,
        widgetId: string,
        updateBody: Partial<ComponentData[T][string]>,
    ): void {
        const currentComponentData = this.#componentsData.getValue();
        this.#componentsData.next({
            ...currentComponentData,
            [component]: {
                ...currentComponentData[component],
                [widgetId]: {
                    ...currentComponentData[component][widgetId],
                    ...updateBody,
                },
            },
        });
    }

    getComponentData<T extends keyof ComponentData>(component: T, widgetId: string): ComponentData[T][string] {
        return this.#componentsData.getValue()[component][widgetId] as ComponentData[T][string];
    }

    selectComponentData<T extends keyof ComponentData>(
        component: T,
        widgetId: string,
    ): Observable<ComponentData[T][string]> {
        return this.#componentsData$.pipe(
            filter((componentData) => componentData !== undefined),
            distinctUntilChanged(),
            map((componentData) => componentData[component][widgetId]),
        ) as Observable<ComponentData[T][string]>;
    }

    dispose(): void {
        this.#componentsData.next({ ...componentDataInitialValue });
    }
}

export const componentsDataAggregate = new ComponentsDataAggregate();
