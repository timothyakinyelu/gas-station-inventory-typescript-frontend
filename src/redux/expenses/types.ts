export interface Expense {
    id?: number;
    expense_amount?: number;
    amount?: number;
    description?: string;
    reference?: string;
    expense_date?: string;
}

export interface Expenses {
    allChecked?: boolean;
    checkboxes?: Expense[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Expense[];
}

export interface ExpensesState {
    expenses?: Expenses;
    expensesDetail?: Expenses;
    editExpense?: Expense;
    expense?: Expense;
    dayExpenses?: Expenses;
}

export const FETCH_STATION_EXPENSES = 'FETCH_STATION_EXPENSES';
export const FETCH_EXPENSES_DETAILS = 'FETCH_EXPENSES_DETAILS';
export const FETCH_EXPENSE_TO_EDIT = 'FETCH_EXPENSE_TO_EDIT';
export const FETCH_DAY_EXPENSES = 'FETCH_DAY_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export interface ExpensesAvgAction {
    type: typeof FETCH_STATION_EXPENSES;
    payload: ExpensesState;
}

export interface ExpensesDetailAction {
    type: typeof FETCH_EXPENSES_DETAILS;
    payload: ExpensesState;
}

export interface EditExpenseAction {
    type: typeof FETCH_EXPENSE_TO_EDIT;
    payload: ExpensesState;
}

export interface DayExpensesAction {
    type: typeof FETCH_DAY_EXPENSES;
    payload: ExpensesState;
}

export interface AddExpenseAction {
    type: typeof ADD_EXPENSE;
    payload: ExpensesState;
}

export type ExpensesActionTypes =
    | ExpensesAvgAction
    | ExpensesDetailAction
    | EditExpenseAction
    | DayExpensesAction
    | AddExpenseAction;
