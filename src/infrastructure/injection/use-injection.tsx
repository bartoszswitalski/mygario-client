import { Container, interfaces } from 'inversify';
import { createContext, ReactNode, useContext } from 'react';

const InversifyContext = createContext<{ dependenciesContainer: Container | null }>({ dependenciesContainer: null });

type ProviderProps = {
    dependenciesContainer: Container;
    children: JSX.Element | JSX.Element[] | ReactNode[] | ReactNode;
};

export const InversifyProvider = ({ dependenciesContainer, children }: ProviderProps) => {
    return <InversifyContext.Provider value={{ dependenciesContainer }}>{children}</InversifyContext.Provider>;
};

export function useInjection<T>(symbol: interfaces.ServiceIdentifier<T>): T {
    const { dependenciesContainer } = useContext(InversifyContext);
    if (!dependenciesContainer) {
        throw new Error();
    }
    return dependenciesContainer.get<T>(symbol);
}
