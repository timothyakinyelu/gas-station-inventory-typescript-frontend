export interface Stock {
    id?: number;
    product_id?: number;
    tank_code?: string;
    open_stock?: number;
    close_stock?: number;
    inventory_sold?: number;
    inventory_received?: number;
    date_of_inventory?: string;
}

export interface Stocks {
    allChecked?: boolean;
    checkboxes?: Stock[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Stock[];
}

export interface StocksState {
    stocks?: Stocks;
    editStock?: Stock;
}

export const FETCH_STATION_STOCKS = 'FETCH_STATION_STOCKS';
export const FETCH_STOCK_TO_EDIT = 'FETCH_STOCK_TO_EDIT';

export interface FetchStocksAction {
    type: typeof FETCH_STATION_STOCKS;
    payload: StocksState;
}

export interface EditStockAction {
    type: typeof FETCH_STOCK_TO_EDIT;
    payload: StocksState;
}

export type StocksActionTypes = FetchStocksAction | EditStockAction;
