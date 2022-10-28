import { Command } from '../../../core/eda';
import { uuid } from '../../../core/types/uuid';

export class WidgetsPlayerMoveCommand extends Command {
    constructor(
        public readonly payload: {
            playerId: uuid;
            x: number;
            y: number;
        },
    ) {
        super();
    }
}
