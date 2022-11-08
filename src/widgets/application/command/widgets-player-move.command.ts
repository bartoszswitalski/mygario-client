import { Command } from '../../../infrastructure/eda';

export class WidgetsPlayerMoveCommand extends Command {
    constructor(
        public readonly payload: {
            userName: string;
            x: number;
            y: number;
            playerSize: number;
        },
        public readonly withRemoteOrigin: boolean,
    ) {
        super();
    }
}
