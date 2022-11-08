import { Command } from '../../../infrastructure/eda';

export class WidgetsInitializeUserCommand extends Command {
    constructor(public readonly payload: { userName: string }) {
        super();
    }
}
