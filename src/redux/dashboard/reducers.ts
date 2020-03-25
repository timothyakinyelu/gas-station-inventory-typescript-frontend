/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    // MetricState,
    DashboardActionTypes,
    CURRENT_MONTH_SALES,
    MetricState,
    CURRENT_MONTH_EXPENSES,
    ALL_MONTH_SALES,
} from './types';

const initialState: MetricState = {
    monthSales: [],
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
        case ALL_MONTH_SALES:
            return {
                ...state.monthSales,
                monthSales: actions.payload,
            };
        default:
            return state;
    }
}
