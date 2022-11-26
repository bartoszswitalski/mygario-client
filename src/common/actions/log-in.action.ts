import { DispatcherAction } from 'src/infrastructure/eda';

export class LogInAction extends DispatcherAction {
    constructor(public readonly payload: { userName: string; token: string }) {
        super(payload);
    }
}
