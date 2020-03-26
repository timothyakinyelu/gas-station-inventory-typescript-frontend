/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Data {
    totalSale?: string;
    totalExpense?: string;
    month?: string;
    product_code?: number;
    product_type?: number;
    product_type_id?: number;
}

export interface Metric {
    id: number;
    name: string;
    data: Data[];
}

export interface MetricState {
    chartInfo: Metric[];
    cMonthSales?: Metric[];
    cMonthExpenses?: Metric[];
}

export const CURRENT_MONTH_SALES = 'CURRENT_MONTH_SALES';
export const CURRENT_MONTH_EXPENSES = 'CURRENT_MONTH_EXPENSES';
export const CHART_INFO = 'CHART_INFO';

export interface CurrentMonthSalesAction {
    type: typeof CURRENT_MONTH_SALES;
    payload: MetricState;
}

export interface CurrentMonthExpensesAction {
    type: typeof CURRENT_MONTH_EXPENSES;
    payload: MetricState;
}

export interface ChartInfoAction {
    type: typeof CHART_INFO;
    payload: MetricState;
}

export type DashboardActionTypes = CurrentMonthSalesAction | CurrentMonthExpensesAction | ChartInfoAction;
