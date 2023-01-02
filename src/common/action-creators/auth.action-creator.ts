import axios from 'axios';
import { inject, injectable } from 'inversify';
import { LogInAction } from 'src/common/actions/log-in.action';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import type { Dispatcher } from 'src/infrastructure/eda/dispatcher/dispatcher.model';
import type { SyncService } from 'src/widgets/models/sync';
import { SYNC_SERVICE } from 'src/widgets/models/sync';

@injectable()
export class AuthActionCreator implements ActionCreator {
    constructor(
        @inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher,
        @inject(SYNC_SERVICE) private readonly _syncService: SyncService,
    ) {}

    create(userName: string): void {
        axios.post('auth/login', { userName }).then((loginResponse) => {
            const token = loginResponse.data.token;
            this._dispatcher.dispatch(new LogInAction({ userName, token }));
            this._syncService.initialize(token);
        });
    }
}

export const AUTH_ACTION_CREATOR = Symbol('AUTH_ACTION_CREATOR');
