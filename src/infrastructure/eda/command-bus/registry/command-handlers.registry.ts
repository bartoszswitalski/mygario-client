import { Subscription } from 'rxjs';
import { CommandHandler } from 'infrastructure/eda/command-bus/command-bus.model';
import { commandBus } from 'infrastructure/eda/command-bus/command-bus';
import { InjectionToken } from 'infrastructure/injection';

export class CommandHandlersRegistry {
    #subscriptions: Subscription = new Subscription();

    registerCommandHandlers(commandHandlers: CommandHandler[]): void {
        commandHandlers.forEach((commandHandler) => this.#registerCommandHandler(commandHandler));
    }

    #registerCommandHandler(commandHandler: CommandHandler): void {
        this.#subscriptions.add(
            commandBus.on(commandHandler.command).subscribe((command) => {
                commandHandler.handle(command);
            }),
        );
    }

    dispose(): void {
        this.#subscriptions.unsubscribe();
    }
}

export const COMMAND_HANDLERS_REGISTRY = new InjectionToken('COMMAND_HANDLERS_REGISTRY');
