/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Toast, ADD_TOAST, REMOVE_TOAST, ToastActionTypes } from './types';

export function addToast(newToast: Toast): ToastActionTypes {
    return {
        type: ADD_TOAST,
        payload: newToast,
    };
}

export function removeToast(id: number): ToastActionTypes {
    return {
        type: REMOVE_TOAST,
        meta: {
            id,
        },
    };
}
