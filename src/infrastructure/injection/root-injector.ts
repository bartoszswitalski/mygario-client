import { Class } from '../../core/types/class';
import { withProviders } from './providers';
import { InjectionToken } from './injection-token';

const ROOT_PROVIDERS: { provide: InjectionToken; useValue: unknown }[] = [];

export const withRootProviders = (ClassToApplyRootInjector: Class<unknown>) =>
    withProviders(ClassToApplyRootInjector, ROOT_PROVIDERS);
