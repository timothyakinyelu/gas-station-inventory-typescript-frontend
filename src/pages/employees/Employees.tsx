import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../../reusables/Loader';
import { AddButton } from '../../reusables/partials/Buttons';
import EmployeesList from '../../components/employees/EmployeesList';
import EmployeeModal from '../../components/employees/EmployeeModal';
import employee from '../../api/employee';
import { fetchEmployees, fetchEmployeeToEdit } from '../../redux/employees/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Employee } from '../../redux/employees/types';
import { AppState } from '../../redux';
import { EmployeesState } from '../../redux/employees/types';
import { addToast } from '../../redux/toast/actions';

interface EmployeesProp {
    fetchEmployees: typeof fetchEmployees;
    fetchEmployeeToEdit: typeof fetchEmployeeToEdit;
    editEmployee?: Employee;
    addToast: typeof addToast;
}

const Employees: React.FC<EmployeesProp> = (props): JSX.Element => {
    const { fetchEmployees, fetchEmployeeToEdit, editEmployee } = props;

    const { companyID } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const count = Math.random() * 100 + 1;

    const getEmployees = useCallback(() => {
        employee.getEmployees(companyID).then((res) => {
            fetchEmployees({
                employees: res.data,
            });
            setIsLoading(false);
        });
    }, [fetchEmployees, companyID]);

    useEffect(() => {
        const ac = new AbortController();

        getEmployees();
        setIsFetched(true);

        return function cleanup(): void {
            setIsFetched(false);
            ac.abort();
        };
    }, [getEmployees]);

    function handleShow(): void {
        setModalShow(true);
        setLoading(false);
    }

    const handleHide = (): void => {
        setModalShow(false);
        setLoading(true);
        fetchEmployeeToEdit({
            editEmployee: {},
        });
    };

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        // try {
        employee
            .editEmployee(id)
            .then((res) => {
                console.log(res.data);
                fetchEmployeeToEdit({
                    editEmployee: res.data.employee,
                });
                setLoading(false);
            })
            .catch((err) => {
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        // } catch (e) {
        //     console.log(e.response);
        // }
    };

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">Service Station Employees</h3>
                {!isFetched ? (
                    <div className="list-table">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <AddButton handleShow={handleShow} />
                        {!isLoading && <EmployeesList getEmployees={getEmployees} handleEdit={handleEdit} />}
                        {!loading && (
                            <EmployeeModal
                                show={modalShow}
                                onHide={handleHide}
                                getEmployees={getEmployees}
                                editEmployee={editEmployee}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

Employees.propTypes = {
    fetchEmployees: PropTypes.any,
    fetchEmployeeToEdit: PropTypes.any,
    addToast: PropTypes.any,
    editEmployee: PropTypes.object,
};

const mapStateToProps = (state: AppState): EmployeesState => ({
    editEmployee: state.employeesRoot.editEmployee,
});

export default connect(mapStateToProps, { fetchEmployees, fetchEmployeeToEdit, addToast })(Employees);
