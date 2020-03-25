import { ToastState, ToastActionTypes, ADD_TOAST, REMOVE_TOAST } from './types';

const initialState: ToastState = {
    toasts: [],
};

export function ToastReducer(state = initialState, actions: ToastActionTypes): ToastState {
    switch (actions.type) {
        case ADD_TOAST:
            return {
                toasts: [...state.toasts, actions.payload],
            };
        case REMOVE_TOAST:
            return {
                toasts: state.toasts.filter((toast) => toast.id !== actions.meta.id),
            };
        default:
            return state;
    }
}
