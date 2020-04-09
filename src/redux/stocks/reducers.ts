import { StocksState, StocksActionTypes, FETCH_STATION_STOCKS, FETCH_STOCK_TO_EDIT } from './types';

const initialState: StocksState = {
    stocks: {},
    editStock: {},
};

export function StocksReducer(state = initialState, actions: StocksActionTypes): StocksState {
    switch (actions.type) {
        case FETCH_STATION_STOCKS:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_STOCK_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
