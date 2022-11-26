import { inject, injectable } from 'inversify';
import { BehaviorSubject, distinctUntilChanged, map, Observable, takeUntil, withLatestFrom } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DisposeStoragesAction } from 'src/board/actions/dispose-storages.action';
import { Class } from 'src/common/utils/class';
import { uuid } from 'src/core/types/uuid';
import type { Dispatcher } from 'src/infrastructure/eda';
import { DispatcherAction } from 'src/infrastructure/eda';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { SetColorAction } from 'src/widgets/actions/widgets-set-color.action';
import { SetSizeAction } from 'src/widgets/actions/widgets-set-size.action';
import { SetTransformAction } from 'src/widgets/actions/widgets-set-transform.action';
import { SetZIndexAction } from 'src/widgets/actions/widgets-set-z-index.action';
import {
    ColorComponentData,
    ComponentData,
    componentDataInitialValue,
    SizeComponentData,
    TransformComponentData,
    WidgetComponentData,
    ZIndexComponentData,
} from 'src/widgets/models/component-data/component-data.model';

@injectable()
export class ComponentDataState {
    readonly #componentsData = new BehaviorSubject<ComponentData>(componentDataInitialValue);

    constructor(@inject(APPLICATION_DISPATCHER) readonly _dispatcher: Dispatcher) {
        this._observeSetComponentData(SetTransformAction, WidgetComponentData.Transform);
        this._observeSetComponentData(SetSizeAction, WidgetComponentData.Size);
        this._observeSetComponentData(SetZIndexAction, WidgetComponentData.ZIndex);
        this._observeSetComponentData(SetColorAction, WidgetComponentData.Color);
    }

    private _observeSetComponentData<T extends keyof ComponentData, A extends DispatcherAction>(
        action: Class<A>,
        component: T,
    ): void {
        this._dispatcher
            .on(action)
            .pipe(takeUntil(this._dispatcher.on(DisposeStoragesAction)), withLatestFrom(this.#componentsData))
            .subscribe(
                ([{ payload }, currentComponentData]: [
                    { widgetId: string; data: Record<string, unknown> } & any,
                    ComponentData,
                ]) => {
                    this.#componentsData.next({
                        ...currentComponentData,
                        [component]: {
                            ...currentComponentData[component],
                            [payload.widgetId]: {
                                ...currentComponentData[component][payload.widgetId],
                                ...payload.data,
                            },
                        },
                    });
                },
            );
    }

    transform$(widgetId: uuid): Observable<TransformComponentData> {
        return this._selectComponentData(WidgetComponentData.Transform, widgetId);
    }

    size$(widgetId: uuid): Observable<SizeComponentData> {
        return this._selectComponentData(WidgetComponentData.Size, widgetId);
    }

    zIndex$(widgetId: uuid): Observable<ZIndexComponentData> {
        return this._selectComponentData(WidgetComponentData.ZIndex, widgetId);
    }

    color$(widgetId: uuid): Observable<ColorComponentData> {
        return this._selectComponentData(WidgetComponentData.Color, widgetId);
    }

    private _selectComponentData<T extends keyof ComponentData>(
        component: T,
        widgetId: string,
    ): Observable<ComponentData[T][string]> {
        return this.#componentsData.pipe(
            filter((componentData) => componentData !== undefined),
            distinctUntilChanged(),
            map((componentData) => componentData[component][widgetId]),
        ) as Observable<ComponentData[T][string]>;
    }

    dispose(): void {
        this.#componentsData.next({ ...componentDataInitialValue });
    }
}

export const COMPONENT_DATA_STATE = Symbol('COMPONENT_DATA_STATE');
