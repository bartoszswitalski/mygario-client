import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ActionType, authStore } from '../store/store';
import { toastError } from '../shared/toastError';
import { useToast } from '@chakra-ui/react';
import { tokenExpired } from '../store/jwtExpiration';

type LoginResponse = {
    userName: string;
    token: string;
};

export function useAuth() {
    const toast = useToast();
    const { userName, token } = authStore.getState();

    const login = async (userName: string) => {
        const loginResponse = await axios.post('/auth/login', { userName });
        return { userName, token: loginResponse.data.token };
    };

    const loginMutation = useMutation(login, {
        onSuccess: (response: LoginResponse) => {
            authStore.dispatch({
                type: ActionType.Login,
                payload: { userName: response.userName, token: response.token },
            });
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
        },
        onError: (error: AxiosError) => toastError(toast, error),
    });

    const logout = () => {
        authStore.dispatch({ type: ActionType.Logout });
        delete axios.defaults.headers.common['Authorization'];
    };

    const isLoggedIn = !(userName === null || token === null || tokenExpired(token));

    return { loginMutation, logout, isLoggedIn };
}