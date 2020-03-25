export interface Toast {
    id: number;
    message: string;
}

export interface ToastState {
    toasts: Toast[];
}

export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

export interface AddToastAction {
    type: typeof ADD_TOAST;
    payload: Toast;
}

export interface RemoveToastAction {
    type: typeof REMOVE_TOAST;
    meta: {
        id: number;
    };
}

export type ToastActionTypes = AddToastAction | RemoveToastAction;
