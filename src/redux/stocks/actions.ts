import {
    StocksState,
    StocksActionTypes,
    FETCH_STATION_STOCKS,
    FETCH_STOCK_TO_EDIT,
    FETCH_DAY_STOCKS,
    ADD_STOCK,
} from './types';

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

export function fetchDayStocks(dayStocks: StocksState): StocksActionTypes {
    return {
        type: FETCH_DAY_STOCKS,
        payload: dayStocks,
    };
}

export function addStock(stock: StocksState): StocksActionTypes {
    return {
        type: ADD_STOCK,
        payload: stock,
    };
}
