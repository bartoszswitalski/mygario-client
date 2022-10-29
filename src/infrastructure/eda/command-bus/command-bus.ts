import { Observable, Subject } from 'rxjs';
import { Command } from 'infrastructure/eda/command-bus/command-bus.model';
import { filter } from 'rxjs/operators';
import { Class } from 'core/types/class';

export class CommandBus {
    readonly #bus = new Subject<Command>();

    dispatch(command: Command) {
        this.#bus.next(command);
    }

    on<T extends Command>(listenedCommand: Class<T>): Observable<T> {
        return this.#bus.pipe(filter((command) => command.isEqual(listenedCommand))) as Observable<T>;
    }
}

export const commandBus = new CommandBus();
