import { Action, configureStore } from '@reduxjs/toolkit';
import { switchCase } from '../shared/utils';
import { uuid } from '../core/types/uuid';

type AuthAction = Action<ActionType> & {
    payload?: { userName: string | null; userId: uuid | null; token: string | null };
};

export enum ActionType {
    Login,
    Logout,
}

type StoreState = {
    userName: string | null;
    userId: uuid | null;
    token: string | null;
};

const initialState: StoreState = {
    userName: null,
    userId: null,
    token: null,
};

const authReducer = (state = initialState, action: AuthAction): StoreState => {
    return switchCase({
        [ActionType.Login]: {
            ...state,
            userName: action.payload?.userName ?? null,
            userId: action.payload?.userId ?? null,
            token: action.payload?.token ?? null,
        },
        [ActionType.Logout]: {
            ...state,
            userName: null,
            userId: null,
            token: null,
        },
        default: state,
    })(action.type);
};

export const authStore = configureStore<StoreState, AuthAction>({ reducer: authReducer, preloadedState: initialState });
