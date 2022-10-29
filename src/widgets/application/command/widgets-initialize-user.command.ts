import { Command } from '../../../infrastructure/eda';
import { uuid } from '../../../core/types/uuid';

export class WidgetsInitializeUserCommand extends Command {
    constructor(public readonly payload: { playerId: uuid }) {
        super();
    }
}
