import { inject, injectable } from 'inversify';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DisposeStoragesAction } from 'src/board/actions/dispose-storages.action';
import { LogInAction } from 'src/common/actions/log-in.action';
import type { Dispatcher } from 'src/infrastructure/eda';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';

type Credentials = {
    userName: string;
    token: string;
};

@injectable()
export class AuthState {
    readonly #credentials = new Subject<Credentials>();

    constructor(@inject(APPLICATION_DISPATCHER) readonly _dispatcher: Dispatcher) {
        this._observeLogIn();
    }

    private _observeLogIn(): void {
        this._dispatcher
            .on(LogInAction)
            .pipe(takeUntil(this._dispatcher.on(DisposeStoragesAction)))
            .subscribe(({ payload }) => {
                this.#credentials.next({ userName: payload.userName, token: payload.token });
            });
    }

    credentials$(): Observable<Credentials> {
        return this.#credentials;
    }
}

export const AUTH_STATE = Symbol('AUTH_STATE');
