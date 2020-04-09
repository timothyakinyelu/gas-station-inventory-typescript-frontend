/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { addToast } from '../../redux/toast/actions';
import { Employees, FETCH_EMPLOYEES, EmployeesState } from '../../redux/employees/types';
import { connect, useDispatch } from 'react-redux';
import employee from '../../api/employee';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import DataTable from '../../reusables/partials/DataTable';
import { AppState } from '../../redux';

interface EmployeesListProp {
    employees?: Employees;
    addToast?: typeof addToast;
    getEmployees: () => void;
    handleEdit: (value?: number) => void;
}

const EmployeesList: React.FC<EmployeesListProp> = (props): JSX.Element => {
    const { employees } = props;

    const items = employees;
    const count = Math.random() * 100 + 1;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            employee.getEmployees(companyID, pageNumber).then((res) => {
                dispatch({
                    type: FETCH_EMPLOYEES,
                    payload: {
                        employees: res.data,
                    },
                });
            });

            history.push('/' + companyID + '/' + company + '/employees?page=' + pageNumber);
        },
        [dispatch, history, companyID, company],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    useEffect(() => {
        const ac = new AbortController();
        if (!page) {
            return;
        }

        fetchData(page);
        changePage(page);
        return function cleanup(): void {
            ac.abort();
        };
    }, [page, changePage, fetchData]);

    const deleteSelected = (data?: any[]): void => {
        employee.deleteEmployee(data).then((res) => {
            addToast({
                id: count,
                message: res.data.status,
            });
            props.getEmployees();
        });
    };

    return (
        <div className="list-table">
            <div className="list-table-inner">
                {items?.data && (
                    <DataTable
                        items={items}
                        deleteSelected={deleteSelected}
                        changePage={changePage}
                        handleEdit={props.handleEdit}
                    />
                )}
            </div>
        </div>
    );
};

EmployeesList.propTypes = {
    employees: PropTypes.object,
    addToast: PropTypes.any,
    getEmployees: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): EmployeesState => ({
    employees: state.employeesRoot.employees,
});

export default connect(mapStateToProps, { addToast })(EmployeesList);
