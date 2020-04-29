/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AuthState, START_SESSION, END_SESSION } from './types';

export function startSession(startSession: AuthState) {
    return {
        type: START_SESSION,
        payload: startSession,
    };
}

export function endSession(endSession: AuthState) {
    return {
        type: END_SESSION,
        payload: endSession,
    };
}
