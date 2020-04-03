import { START_SESSION, AuthState, AuthActionTypes, END_SESSION } from './types';

const initialState: AuthState = {
    isLoggedIn: false,
    user: {},
};

export function AuthReducer(state = initialState, actions: AuthActionTypes): AuthState {
    switch (actions.type) {
        case START_SESSION: {
            return {
                ...state,
                ...actions.payload,
            };
        }
        case END_SESSION: {
            return {
                ...state,
                ...actions.payload,
            };
        }
        default:
            return state;
    }
}
