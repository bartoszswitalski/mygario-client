import { inject, injectable } from 'inversify';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DisposeStoragesAction } from 'src/board/actions/dispose-storages.action';
import { MoveCursorAction } from 'src/board/actions/move-cursor.action';
import type { Dispatcher } from 'src/infrastructure/eda';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';

@injectable()
export class CursorState {
    readonly #cursorCoords = new Subject<{ x: number; y: number }>();

    constructor(@inject(APPLICATION_DISPATCHER) readonly _dispatcher: Dispatcher) {
        this._observeCursorMove();
    }

    private _observeCursorMove(): void {
        this._dispatcher
            .on(MoveCursorAction)
            .pipe(takeUntil(this._dispatcher.on(DisposeStoragesAction)))
            .subscribe(({ payload: { x, y } }) => {
                this.#cursorCoords.next({ x, y });
            });
    }

    cursorCoords$(): Observable<{ x: number; y: number }> {
        return this.#cursorCoords;
    }
}

export const CURSOR_STATE = Symbol('CURSOR_STATE');
