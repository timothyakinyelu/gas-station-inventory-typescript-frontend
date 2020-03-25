import { UPDATE_SESSION, AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
    isLoggedIn: false,
    user: {},
};

export function AuthReducer(state = initialState, actions: AuthActionTypes): AuthState {
    switch (actions.type) {
        case UPDATE_SESSION: {
            return {
                ...state,
                ...actions.payload,
            };
        }
        default:
            return state;
    }
}
