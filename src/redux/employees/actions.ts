import { EmployeesState, EmployeesActionTypes, FETCH_EMPLOYEES, FETCH_EMPLOYEE_TO_EDIT } from './types';

export function fetchEmployees(employees: EmployeesState): EmployeesActionTypes {
    return {
        type: FETCH_EMPLOYEES,
        payload: employees,
    };
}

export function fetchEmployeeToEdit(editEmployee: EmployeesState): EmployeesActionTypes {
    return {
        type: FETCH_EMPLOYEE_TO_EDIT,
        payload: editEmployee,
    };
}
