import { Command } from '../../../infrastructure/eda';

export class WidgetsCameraFollowUserCommand extends Command {
    constructor(public readonly payload: { userName: string }) {
        super();
    }
}
