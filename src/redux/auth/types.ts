export interface User {
    name?: string;
    email?: string;
    role?: string;
    permission?: string;
    station?: string;
    stationId?: number;
    id?: number;
    stationName?: string;
    permissionID?: number;
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

export const UPDATE_SESSION = 'UPDATE_SESSION';

export interface UpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: AuthState;
}

export type AuthActionTypes = UpdateSessionAction;
