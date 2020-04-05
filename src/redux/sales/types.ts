export interface Data {
    id?: number;
    pump_code?: string;
    start_metre?: number;
    end_metre?: number;
    product_code_id?: number;
    product_code?: string;
    product?: string;
    quantity_sold?: number;
    unit_price?: number;
    total_sale?: number;
    amount?: number;
    date?: Date;
    assigned?: string;
    isChecked?: boolean;
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
}

export const FETCH_STATION_SALES = 'FETCH_STATION_SALES';
export const FETCH_SALES_DETAILS = 'FETCH_SALES_DETAILS';

export interface SalesAvgAction {
    type: typeof FETCH_STATION_SALES;
    payload: SalesState;
}

export interface SalesDetailAction {
    type: typeof FETCH_SALES_DETAILS;
    payload: SalesState;
}

export type SalesActionTypes = SalesAvgAction | SalesDetailAction;
