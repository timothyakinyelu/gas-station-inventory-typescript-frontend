import { StocksState, StocksActionTypes, FETCH_STATION_STOCKS, FETCH_STOCK_TO_EDIT } from './types';

export function fetchStationStocks(stocks: StocksState): StocksActionTypes {
    return {
        type: FETCH_STATION_STOCKS,
        payload: stocks,
    };
}

export function fetchStockToEdit(editStock: StocksState): StocksActionTypes {
    return {
        type: FETCH_STOCK_TO_EDIT,
        payload: editStock,
    };
}
