import { InjectionToken } from '../../infrastructure/injection';

export interface LoadsBoardData {
    load(): Promise<void>;
}

export const LOADS_BOARD_DATA = new InjectionToken('LOADS_BOARD_DATA');
