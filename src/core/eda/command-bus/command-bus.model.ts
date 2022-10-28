import { Class } from 'core/types/class';

export class Command {
    isEqual(eventType: any): boolean {
        return this instanceof eventType;
    }
}

export interface CommandHandler {
    command: Class<Command>;

    handle(command: Command): void;
}
