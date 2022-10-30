import { Command } from '../../../infrastructure/eda';
import { uuid } from '../../../core/types/uuid';

export class WidgetsPlayerMoveCommand extends Command {
    constructor(
        public readonly payload: {
            playerId: uuid;
            x: number;
            y: number;
            playerSize: number;
        },
    ) {
        super();
    }
}
