/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardActionTypes, CURRENT_MONTH_SALES, MetricState, CURRENT_MONTH_EXPENSES, CHART_INFO } from './types';

const initialState: MetricState = {
    chartInfo: [],
    cMonthSales: [],
    cMonthExpenses: [],
};

export function DashboardReducer(state = initialState, actions: DashboardActionTypes): any {
    switch (actions.type) {
        case CURRENT_MONTH_SALES:
            return {
                ...state.cMonthSales,
                cMonthSales: actions.payload,
            };
        case CURRENT_MONTH_EXPENSES:
            return {
                ...state.cMonthExpenses,
                cMonthExpenses: actions.payload,
            };
        case CHART_INFO:
            return {
                ...state.chartInfo,
                chartInfo: actions.payload,
            };
        default:
            return state;
    }
}
