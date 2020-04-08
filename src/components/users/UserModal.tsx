/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import { addToast } from '../../redux/toast/actions';
import { User } from '../../redux/auth/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inTreeApi } from '../../config';
import { debounce } from 'lodash';
import user from '../../api/user';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';
import { useParams } from 'react-router-dom';

interface UserModalProps {
    show?: boolean;
    onHide?: () => void;
    addToast: typeof addToast;
    getUsers: () => void;
    editUser?: User;
    stations?: Station[];
}

const UserModal: React.FC<UserModalProps> = (props): JSX.Element => {
    const [showAutoComplete, setShowAutoComplete] = useState(true);
    const [stationID, setStationID] = useState<number>();
    const [employeeName, setEmployeeName] = useState<string | undefined>('');
    const [employeeID, setEmployeeID] = useState<number>();
    const [employees, setEmployees] = useState([]);
    const [employeeEmail, setEmployeeEmail] = useState<string | undefined>('');
    const [permission, setPermission] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);

    const { companyID } = useParams();

    const { getUsers, addToast, editUser, ...rest } = props;
    const count = Math.random() * 100 + 1;
    const id = editUser?.id;

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        setStationID(editUser?.stationID);
        setEmployeeName(editUser?.name);
        setEmployeeEmail(editUser?.email);
        setPermission(editUser?.permissionID);
    }, [editUser, id]);

    const sendQuery = (query: string): void => {
        if (employeeName === undefined) return;
        if (employeeName?.length > -1) {
            setShowAutoComplete(true);
            const requestOptions = {
                params: {
                    search: query,
                },
            };
            inTreeApi.get('/employees/' + companyID + '/search', requestOptions).then(function (response) {
                setEmployees(response.data.employees);
            });
        }
    };

    const delayedQuery = useCallback(
        debounce((q: string) => sendQuery(q), 500),
        [],
    );

    const searchEmployees = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmployeeName(e.target.value);
        delayedQuery(e.target.value);
    };

    function selectEmployee(employee: any): void {
        // console.log(employee)
        setShowAutoComplete(false);
        setEmployeeName(employee.name);
        setEmployeeID(employee.id);
        setEmployees([]);
    }

    function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        try {
            user.updateUser(id, permission)
                .then((res) => {
                    setIsLoading(false);
                    setPermission(Number(''));
                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    getUsers();
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
        // props.onHide();
        setIsLoading(true);
    }

    function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        try {
            user.storeUser(stationID, employeeID, employeeEmail, permission, companyID)
                .then((res) => {
                    setIsLoading(false);
                    setStationID(Number(''));
                    setEmployeeEmail('');
                    setEmployeeName('');
                    setEmployeeID(Number(''));
                    setPermission(Number(''));

                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    getUsers();
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }

        setIsLoading(true);
    }

    function getEmployees(): any {
        if (employees) {
            return employees.map((employee: any, index: number) => {
                return (
                    <div className="company-autocomplete" key={index} onClick={(): void => selectEmployee(employee)}>
                        <span className="company-name">{employee.name}</span>
                    </div>
                );
            });
        }
    }

    function station(): any {
        const stations = props.stations;

        if (stations) {
            return stations.map((station) => {
                return (
                    <option key={station.id} value={station.id}>
                        {station.name}
                    </option>
                );
            });
        }
    }

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                {editUser?.id === undefined ? (
                    <Modal.Title id="contained-modal-title-vcenter">New User</Modal.Title>
                ) : (
                    <Modal.Title id="contained-modal-title-vcenter">Edit {editUser?.name}</Modal.Title>
                )}
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="2">
                        <Form.Label>Station</Form.Label>
                        <Form.Control
                            className="modalSelect"
                            value={stationID?.toString() || ''}
                            as="select"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                                setStationID(Number(e.target.value))
                            }
                        >
                            <option value="">-SELECT A STATION-</option>
                            {station()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Employee</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type employee name to search"
                            value={employeeName || ''}
                            onChange={searchEmployees}
                        />
                        <Form.Control type="hidden" defaultValue={employeeID} />
                        {employeeName !== undefined
                            ? employeeName?.length > 0 &&
                              showAutoComplete && <div className="company-autocomplete-container">{getEmployees()}</div>
                            : ''}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter user email"
                            value={employeeEmail || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setEmployeeEmail(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="3">
                        <Form.Label>Permission</Form.Label>
                        <Form.Control
                            value={permission?.toString() || ''}
                            as="select"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
                                setPermission(Number(e.target.value))
                            }
                        >
                            <option value="">-SELECT A ROLE PERMISSION-</option>
                            <option value="0">Data Entry</option>
                            <option value="1">Admin</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {editUser?.id === undefined ? (
                    <Button className="modal-button" onClick={handleSave}>
                        {isLoading && (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        )}
                        Save
                    </Button>
                ) : (
                    <Button className="modal-button" onClick={handleUpdate}>
                        {isLoading && (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        )}
                        Update
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

UserModal.propTypes = {
    show: PropTypes.bool,
    addToast: PropTypes.any,
    getUsers: PropTypes.any,
    editUser: PropTypes.object,
    onHide: PropTypes.any,
    stations: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    stations: state.center.stations,
});

export default connect(mapStateToProps, { addToast })(UserModal);
