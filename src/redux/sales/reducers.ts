import { SalesState, SalesActionTypes, FETCH_STATION_SALES, FETCH_SALES_DETAILS } from './types';

const initialState: SalesState = {
    sales: {},
    salesDetail: {},
};

export function SalesReducer(state = initialState, actions: SalesActionTypes): SalesState {
    switch (actions.type) {
        case FETCH_STATION_SALES:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_SALES_DETAILS:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
