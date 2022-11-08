import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ActionType, authStore } from '../store/store';
import { toastError } from '../shared/toastError';
import { useToast } from '@chakra-ui/react';
import { tokenExpired } from '../store/jwtExpiration';
import { useEffect, useState } from 'react';

type LoginResponse = {
    userName: string;
    token: string;
};

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toast = useToast();

    const login = async (userName: string) => {
        const loginResponse = await axios.post('auth/login', { userName: userName });

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

    useEffect(() => {
        const { userName, token } = authStore.getState();
        setIsLoggedIn(!(userName === null || token === null || tokenExpired(token)));
    }, [loginMutation.status]);

    return { loginMutation, logout, isLoggedIn };
}
