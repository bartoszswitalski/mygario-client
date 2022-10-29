import { LoadsBoardData } from '../domain/loads-board-data';
import { Injector } from '../../infrastructure/injection';

export class LoadsBoardDataHttpService implements LoadsBoardData {
    constructor(private readonly injector: Injector) {}

    load(): Promise<void> {
        return Promise.resolve();
    }
}
