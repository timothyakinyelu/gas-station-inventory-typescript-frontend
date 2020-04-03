export interface Data {
    product_code_id?: number;
    product_code?: number;
    product?: string;
    total_sale?: number;
    date?: Date;
}

export interface SalesSum {
    data?: Data[];
}

export interface SalesState {
    sales?: SalesSum;
}

export const FETCH_STATION_SALES = 'FETCH_STATION_SALES';

export interface SalesAvgAction {
    type: typeof FETCH_STATION_SALES;
    payload: SalesState;
}

export type SalesActionTypes = SalesAvgAction;
