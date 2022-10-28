import { createContext, ReactNode, useContext, useMemo } from 'react';
import { InjectionToken } from 'core/injection/injection-token';
import { Injector } from 'core/injection/injector';

type DependenciesProviderProps = {
    providers?: { provide: InjectionToken; useValue: unknown }[];
    children: JSX.Element | JSX.Element[] | ReactNode[] | ReactNode;
};

const InjectorContext = createContext(new Injector());

export function DependenciesProvider({ providers = [], children }: DependenciesProviderProps) {
    return (
        <InjectorContext.Provider value={useMemo(() => new Injector(providers), [providers])}>
            {children}
        </InjectorContext.Provider>
    );
}

export function useInjector<T = unknown>(token: InjectionToken): T {
    const injector = useContext(InjectorContext);
    return injector.get<T>(token);
}
