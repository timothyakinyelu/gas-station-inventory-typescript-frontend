import {
    ExpensesState,
    ExpensesActionTypes,
    FETCH_STATION_EXPENSES,
    FETCH_EXPENSES_DETAILS,
    FETCH_EXPENSE_TO_EDIT,
} from './types';

export function fetchStationExpenses(expenses: ExpensesState): ExpensesActionTypes {
    return {
        type: FETCH_STATION_EXPENSES,
        payload: expenses,
    };
}

export function fetchExpensesDetails(expensesDetail: ExpensesState): ExpensesActionTypes {
    return {
        type: FETCH_EXPENSES_DETAILS,
        payload: expensesDetail,
    };
}

export function fetchExpenseToEdit(editExpense: ExpensesState): ExpensesActionTypes {
    return {
        type: FETCH_EXPENSE_TO_EDIT,
        payload: editExpense,
    };
}
