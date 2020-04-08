import { UsersState, UsersActionTypes, FETCH_USERS, FETCH_USER_TO_EDIT } from './types';

const initialState: UsersState = {
    users: {},
    editUser: {},
};

export function UsersReducer(state = initialState, actions: UsersActionTypes): UsersState {
    switch (actions.type) {
        case FETCH_USERS:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_USER_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
