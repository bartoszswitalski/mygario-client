import { InjectionToken } from './injection-token';
import { Injector } from './injector';
import { Class } from '../../core/types/class';

export function withProviders<T>(
    ClassToApplyProviders: Class<T>,
    providers: { provide: InjectionToken; useValue: unknown }[] = [],
): T {
    return new ClassToApplyProviders(new Injector(providers));
}
