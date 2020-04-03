import { SalesState, SalesActionTypes, FETCH_STATION_SALES } from './types';

const initialState: SalesState = {
    sales: {},
};

export function SalesReducer(state = initialState, actions: SalesActionTypes): SalesState {
    switch (actions.type) {
        case FETCH_STATION_SALES:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
