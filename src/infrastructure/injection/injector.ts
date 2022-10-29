import { InjectionToken } from 'infrastructure/injection/injection-token';

type Provider = { provide: InjectionToken; useValue: unknown };

export class Injector {
    #providersMap = new Map<InjectionToken['value'], unknown>();

    constructor(private readonly providers: Provider[] = []) {
        this.#providersMap = new Map(providers.map((provider) => [provider.provide.value, provider.useValue]));
    }

    get<T = unknown>(token: InjectionToken): T {
        if (!this.#providersMap.has(token.value)) {
            throw new Error(`No provider for ${token.value}`);
        }

        return this.#providersMap.get(token.value) as T;
    }
}
