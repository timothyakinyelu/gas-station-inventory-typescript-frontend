export interface Employee {
    id?: number;
    station_id?: number;
    firstName?: string;
    secondName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
    role?: string;
    salary?: number;
    date_hired?: string;
}

export interface Employees {
    allChecked?: boolean;
    checkboxes?: Employee[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Employee[];
}

export interface EmployeesState {
    employees?: Employees;
    editEmployee?: Employee;
}

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_EMPLOYEE_TO_EDIT = 'FETCH_EMPLOYEE_TO_EDIT';

export interface FetchEmployeesAction {
    type: typeof FETCH_EMPLOYEES;
    payload: EmployeesState;
}

export interface EditEmployeeAction {
    type: typeof FETCH_EMPLOYEE_TO_EDIT;
    payload: EmployeesState;
}

export type EmployeesActionTypes = FetchEmployeesAction | EditEmployeeAction;
