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

export interface SalesSum {
    allChecked?: boolean;
    checkboxes?: Data[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
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
