import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'reflect-metadata';
import { App } from 'src/App';
import { dependenciesContainer } from 'src/infrastructure/injection/inversify.config';
import { InversifyProvider } from 'src/infrastructure/injection/use-injection';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND ?? 'http://localhost:3001/';

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
        <InversifyProvider dependenciesContainer={dependenciesContainer}>
            <App />
        </InversifyProvider>
    );
};

root.render(<MygarioApp />);
