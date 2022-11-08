import { Command } from '../../../infrastructure/eda';

export class WidgetsPlayerCreateCommand extends Command {
    constructor(
        public readonly payload: {
            userName: string;
            position: { x: number; y: number };
            size: number;
            color: number;
        },
    ) {
        super();
    }
}
