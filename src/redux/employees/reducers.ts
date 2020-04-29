import { EmployeesState, EmployeesActionTypes, FETCH_EMPLOYEES, FETCH_EMPLOYEE_TO_EDIT } from './types';

const initialState: EmployeesState = {
    employees: {},
    editEmployee: {},
};

export function EmployeesReducer(state = initialState, actions: EmployeesActionTypes): EmployeesState {
    switch (actions.type) {
        case FETCH_EMPLOYEES:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_EMPLOYEE_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
