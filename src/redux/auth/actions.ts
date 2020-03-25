/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthState, UPDATE_SESSION } from './types';

export function updateSession(sessionUpdate: AuthState) {
    return {
        type: UPDATE_SESSION,
        payload: sessionUpdate,
    };
}
