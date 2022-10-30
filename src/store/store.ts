import { Action, configureStore } from '@reduxjs/toolkit';
import { switchCase } from '../shared/utils';
import { uuid } from '../core/types/uuid';

type AuthAction = Action<ActionType> & {
    payload?: { userName: uuid | null; token: string | null };
};

export enum ActionType {
    Login,
    Logout,
}

type StoreState = {
    userName: uuid | null;
    token: string | null;
};

const initialState: StoreState = {
    userName: null,
    token: null,
};

const authReducer = (state = initialState, action: AuthAction): StoreState => {
    return switchCase({
        [ActionType.Login]: {
            ...state,
            userName: action.payload?.userName ?? null,
            token: action.payload?.token ?? null,
        },
        [ActionType.Logout]: {
            ...state,
            userName: null,
            token: null,
        },
        default: state,
    })(action.type);
};

export const authStore = configureStore<StoreState, AuthAction>({ reducer: authReducer, preloadedState: initialState });
