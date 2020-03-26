/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardActionTypes, CURRENT_MONTH_SALES, MetricState, CURRENT_MONTH_EXPENSES, CHART_INFO } from './types';

export function currentMonthSales(cMonthSalesMetric: MetricState): DashboardActionTypes {
    return {
        type: CURRENT_MONTH_SALES,
        payload: cMonthSalesMetric,
    };
}

export function currentMonthExpenses(cMonthExpensesMetric: MetricState): DashboardActionTypes {
    return {
        type: CURRENT_MONTH_EXPENSES,
        payload: cMonthExpensesMetric,
    };
}

export function chartInfo(chartMetric: MetricState): DashboardActionTypes {
    return {
        type: CHART_INFO,
        payload: chartMetric,
    };
}
