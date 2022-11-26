import { Map } from 'immutable';
import { inject, injectable } from 'inversify';
import { BehaviorSubject, Observable, Subject, take, takeUntil, withLatestFrom } from 'rxjs';
import { uuid } from 'src/core/types/uuid';
import type { Dispatcher } from 'src/infrastructure/eda';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import { AddWidgetAction, DisposeWidgetsAction, RemoveWidgetAction } from 'src/widgets/actions';
import { Widget } from 'src/widgets/models/widget';

@injectable()
export class WidgetsStorageState {
    readonly #widgetsStorage = new BehaviorSubject<Map<uuid, Widget>>(Map<uuid, Widget>());
    readonly #addedWidget = new Subject<Widget>();
    readonly #removedWidget = new Subject<Widget>();
    readonly #widgetsDisposed = new Subject<void>();

    constructor(@inject(APPLICATION_DISPATCHER) readonly _dispatcher: Dispatcher) {
        this._observeAddWidget();
        this._observeRemoveWidget();
        this._observeDisposeWidgets();
    }

    private _observeAddWidget(): void {
        this._dispatcher
            .on(AddWidgetAction)
            .pipe(takeUntil(this._dispatcher.on(DisposeWidgetsAction)), withLatestFrom(this.widgetsStorage$()))
            .subscribe(
                ([
                    {
                        payload: { widget },
                    },
                    previous,
                ]) => {
                    this.#addedWidget.next(widget);
                    this.#widgetsStorage.next(previous.set(widget.id, widget));
                },
            );
    }

    private _observeRemoveWidget(): void {
        this._dispatcher
            .on(RemoveWidgetAction)
            .pipe(takeUntil(this._dispatcher.on(DisposeWidgetsAction)), withLatestFrom(this.widgetsStorage$()))
            .subscribe(
                ([
                    {
                        payload: { widgetId },
                    },
                    previous,
                ]) => {
                    this.#removedWidget.next(previous.get(widgetId) as Widget);
                    this.#widgetsStorage.next(previous.delete(widgetId));
                },
            );
    }

    private _observeDisposeWidgets(): void {
        this._dispatcher
            .on(DisposeWidgetsAction)
            .pipe(take(1))
            .subscribe(() => {
                this.#widgetsDisposed.next();
            });
    }

    widgetsStorage$(): Observable<Map<uuid, Widget>> {
        return this.#widgetsStorage;
    }

    addedWidget$(): Observable<Widget> {
        return this.#addedWidget;
    }

    removedWidget$(): Observable<Widget> {
        return this.#removedWidget;
    }

    widgetsDisposed$(): Observable<void> {
        return this.#widgetsDisposed;
    }
}

export const WIDGETS_STORAGE_STATE = Symbol('WIDGETS_STORAGE_STATE');
