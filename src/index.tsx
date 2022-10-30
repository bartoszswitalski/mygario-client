import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'App';
import { DependenciesProvider } from 'infrastructure/injection';
import {
    APPLICATION_EVENT_HANDLERS_REGISTRY,
    ApplicationEventHandlersRegistry,
    COMMAND_HANDLERS_REGISTRY,
    CommandHandlersRegistry,
} from 'infrastructure/eda';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

const container: HTMLElement = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();

const MygarioApp = () => {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path={'*'} element={<AppWithProviders />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

const AppWithProviders = () => {
    return (
        <DependenciesProvider
            providers={[
                {
                    provide: APPLICATION_EVENT_HANDLERS_REGISTRY,
                    useValue: new ApplicationEventHandlersRegistry(),
                },
                {
                    provide: COMMAND_HANDLERS_REGISTRY,
                    useValue: new CommandHandlersRegistry(),
                },
            ]}
        >
            <App />
        </DependenciesProvider>
    );
};

root.render(<MygarioApp />);
