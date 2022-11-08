import { Command } from '../../../infrastructure/eda';

export class WidgetsPlayerGrowCommand extends Command {
    constructor(public readonly payload: { userName: string; playerSize: number }) {
        super();
    }
}
