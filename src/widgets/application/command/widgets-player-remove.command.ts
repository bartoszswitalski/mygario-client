import { Command } from '../../../infrastructure/eda';

export class WidgetsPlayerRemoveCommand extends Command {
    constructor(
        public readonly payload: {
            userName: string;
        },
    ) {
        super();
    }
}
