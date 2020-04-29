import { User } from '../auth/types';

export interface UsersData {
    id?: number;
    email?: string;
    permission?: string;
    station?: string;
}

export interface Users {
    allChecked?: boolean;
    checkboxes?: UsersData[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: UsersData[];
}

export interface UsersState {
    users?: Users;
    editUser?: User;
}

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER_TO_EDIT = 'FETCH_USER_TO_EDIT';

export interface FetchUsersAction {
    type: typeof FETCH_USERS;
    payload: UsersState;
}

export interface EditUserAction {
    type: typeof FETCH_USER_TO_EDIT;
    payload: UsersState;
}

export type UsersActionTypes = FetchUsersAction | EditUserAction;
