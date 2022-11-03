import { Command } from '../../../infrastructure/eda';
import { uuid } from '../../../core/types/uuid';

export class WidgetsPlayerGrowCommand extends Command {
    constructor(public readonly payload: { playerId: uuid; playerSize: number }) {
        super();
    }
}
