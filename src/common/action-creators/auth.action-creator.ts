import axios from 'axios';
import { inject, injectable } from 'inversify';
import { LogInAction } from 'src/common/actions/log-in.action';
import { WEBSOCKET_SERVICE_URL } from 'src/common/models/sync/websocket-service.model';
import { createSyncService } from 'src/common/services/sync/sync.service';
import { ActionCreator } from 'src/infrastructure/eda/action-creator/action-creator.model';
import { APPLICATION_DISPATCHER } from 'src/infrastructure/eda/dispatcher/dispatcher';
import type { Dispatcher } from 'src/infrastructure/eda/dispatcher/dispatcher.model';
import { listenSyncMessages, SYNC_ACTION_CREATORS_FACTORY } from 'src/widgets/services/sync.listeners';

@injectable()
export class AuthActionCreator implements ActionCreator {
    constructor(
        @inject(APPLICATION_DISPATCHER) private readonly _dispatcher: Dispatcher,
        @inject(WEBSOCKET_SERVICE_URL) private readonly _websocketServiceUrl: string,
        @inject(SYNC_ACTION_CREATORS_FACTORY)
        private readonly _syncActionCreatorsFactory: (symbol: symbol) => ActionCreator,
    ) {}

    create(userName: string): void {
        axios.post('auth/login', { userName }).then((loginResponse) => {
            const token = loginResponse.data.token;
            this._dispatcher.dispatch(new LogInAction({ userName, token }));

            // todo: consider moving this elsewhere
            createSyncService(token, this._websocketServiceUrl);
            listenSyncMessages(this._syncActionCreatorsFactory);
        });
    }
}

export const AUTH_ACTION_CREATOR = Symbol('AUTH_ACTION_CREATOR');
