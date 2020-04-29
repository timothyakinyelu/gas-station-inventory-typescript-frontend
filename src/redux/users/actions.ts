import { UsersState, UsersActionTypes, FETCH_USERS, FETCH_USER_TO_EDIT } from './types';

export function fetchUsers(users: UsersState): UsersActionTypes {
    return {
        type: FETCH_USERS,
        payload: users,
    };
}

export function fetchUserToEdit(editUser: UsersState): UsersActionTypes {
    return {
        type: FETCH_USER_TO_EDIT,
        payload: editUser,
    };
}
