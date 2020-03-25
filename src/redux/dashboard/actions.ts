import {
    DashboardActionTypes,
    CURRENT_MONTH_SALES,
    MetricState,
    CURRENT_MONTH_EXPENSES,
    ALL_MONTH_SALES,
} from './types';

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

export function monthSales(monthSalesMetric: MetricState): DashboardActionTypes {
    return {
        type: ALL_MONTH_SALES,
        payload: monthSalesMetric,
    };
}
