export interface Data {
    id?: number;
    product_code_id?: number;
    product_code?: string;
    product?: string;
    total_sale?: number;
    date?: Date;
    assigned?: string;
    isChecked?: boolean;
}

export interface Sale {
    id?: number;
    pump_code?: string;
    start_metre?: number;
    end_metre?: number;
    product_id?: number;
    quantity_sold?: number;
    unit_price?: number;
    total_sale?: number;
    amount?: number;
    date_of_entry?: string;
}

export interface Sales {
    allChecked?: boolean;
    checkboxes?: Data[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Data[];
}

export interface SalesState {
    sales?: Sales;
    salesDetail?: Sales;
    editSale?: Sale;
    sale?: Sale;
    daySales?: Sales;
}

export const FETCH_STATION_SALES = 'FETCH_STATION_SALES';
export const FETCH_SALES_DETAILS = 'FETCH_SALES_DETAILS';
export const FETCH_SALE_TO_EDIT = 'FETCH_SALE_TO_EDIT';
export const FETCH_DAY_SALES = 'FETCH_DAY_SALES';
export const ADD_SALE = 'ADD_SALE';

export interface SalesAvgAction {
    type: typeof FETCH_STATION_SALES;
    payload: SalesState;
}

export interface SalesDetailAction {
    type: typeof FETCH_SALES_DETAILS;
    payload: SalesState;
}

export interface DaySalesAction {
    type: typeof FETCH_DAY_SALES;
    payload: SalesState;
}

export interface EditSaleAction {
    type: typeof FETCH_SALE_TO_EDIT;
    payload: SalesState;
}

export interface AddSaleAction {
    type: typeof ADD_SALE;
    payload: SalesState;
}

export type SalesActionTypes = SalesAvgAction | SalesDetailAction | DaySalesAction | EditSaleAction | AddSaleAction;
