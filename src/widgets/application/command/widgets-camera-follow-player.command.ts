import { Command } from '../../../core/eda';
import { uuid } from '../../../core/types/uuid';

export class WidgetsCameraFollowPlayerCommand extends Command {
    constructor(public readonly payload: { playerId: uuid }) {
        super();
    }
}
