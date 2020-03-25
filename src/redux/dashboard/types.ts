export interface SalesMetric {
    total_Sale?: number;
    month?: string;
    product_code?: number;
    product_type?: number;
    product_type_id?: number;
}

export interface ExpensesMetric {
    total_expense?: number;
    month?: string;
}

export interface MetricState {
    monthSales?: SalesMetric[];
    cMonthSales: SalesMetric[];
    cMonthExpenses?: ExpensesMetric[];
}

export const CURRENT_MONTH_SALES = 'CURRENT_MONTH_SALES';
export const CURRENT_MONTH_EXPENSES = 'CURRENT_MONTH_EXPENSES';
export const ALL_MONTH_SALES = 'ALL_MONTH_SALES';

export interface CurrentMonthSalesAction {
    type: typeof CURRENT_MONTH_SALES;
    payload: MetricState;
}

export interface CurrentMonthExpensesAction {
    type: typeof CURRENT_MONTH_EXPENSES;
    payload: MetricState;
}

export interface AllMonthSalesAction {
    type: typeof ALL_MONTH_SALES;
    payload: MetricState;
}

export type DashboardActionTypes = CurrentMonthSalesAction | CurrentMonthExpensesAction | AllMonthSalesAction;
