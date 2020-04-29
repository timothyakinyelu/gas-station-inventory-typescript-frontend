export interface User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    permission?: string;
    station?: string;
    stationID?: number;
    stationName?: string;
    company?: string;
    companyID?: string;
    permissionID?: number;
}

export interface AuthState {
    isLoggedIn: boolean;
    user: User;
}

export const START_SESSION = 'UPDATE_SESSION';
export const END_SESSION = 'END_SESSION';

export interface StartSessionAction {
    type: typeof START_SESSION;
    payload: AuthState;
}

export interface EndSessionAction {
    type: typeof END_SESSION;
    payload: AuthState;
}

export type AuthActionTypes = StartSessionAction | EndSessionAction;
