import {
    ExpensesState,
    ExpensesActionTypes,
    FETCH_STATION_EXPENSES,
    FETCH_EXPENSES_DETAILS,
    FETCH_EXPENSE_TO_EDIT,
    ADD_EXPENSE,
    FETCH_DAY_EXPENSES,
} from './types';

const initialState: ExpensesState = {
    expenses: {},
    expensesDetail: {},
    editExpense: {},
    expense: {},
    dayExpenses: {},
};

export function ExpensesReducer(state = initialState, actions: ExpensesActionTypes): ExpensesState {
    switch (actions.type) {
        case FETCH_STATION_EXPENSES:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_EXPENSES_DETAILS:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_EXPENSE_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        case ADD_EXPENSE:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_DAY_EXPENSES:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
