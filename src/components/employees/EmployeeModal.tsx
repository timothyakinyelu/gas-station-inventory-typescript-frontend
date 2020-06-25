/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { addToast } from '../../redux/toast/actions';
import { Employee } from '../../redux/employees/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import employee from '../../api/employee';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';
import { useParams } from 'react-router-dom';

interface EmployeeModalProps {
    show?: boolean;
    onHide?: () => void;
    addToast: typeof addToast;
    getEmployees: () => void;
    editEmployee?: Employee;
    stations?: Station[];
}

const EmployeeModal: React.FC<EmployeeModalProps> = (props): JSX.Element => {
    const [stationID, setStationID] = useState<number>();
    const [firstName, setFirstName] = useState<string | undefined>('');
    const [secondName, setSecondName] = useState<string | undefined>('');
    const [lastName, setLastName] = useState<string | undefined>('');
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
    const [address, setAddress] = useState<string | undefined>('');
    const [dateOfBirth, setDateOfBirth] = useState<string | undefined>('');
    const [employeeRole, setEmployeeRole] = useState<string | undefined>('');
    const [salary, setSalary] = useState<number>();
    const [dateOfHire, setDateOfHire] = useState<string | undefined>('');
    const [avatar, setAvatar] = useState<string | undefined>('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');
    const [isLoading, setIsLoading] = useState(false);

    const { companyID } = useParams();

    const { getEmployees, addToast, editEmployee, ...rest } = props;
    const count = Math.random() * 100 + 1;
    const id = editEmployee?.id;

    useEffect(() => {
        if (id === undefined) {
            return;
        }

        setStationID(editEmployee?.station_id);
        setFirstName(editEmployee?.firstName);
        setSecondName(editEmployee?.secondName);
        setLastName(editEmployee?.lastName);
        setPhoneNumber(editEmployee?.phone);
        setAddress(editEmployee?.address);
        setDateOfBirth(editEmployee?.date_of_birth);
        setEmployeeRole(editEmployee?.role);
        setSalary(editEmployee?.salary);
        setDateOfHire(editEmployee?.date_hired);
    }, [editEmployee, id]);

    function handleImage(e: any): void {
        const reader = new FileReader();

        const file = e.target.files[0];

        setAvatar(file);
        reader.onloadend = (): void => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleUpdate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        try {
            employee
                .updateEmployee(
                    id,
                    stationID,
                    firstName,
                    secondName,
                    lastName,
                    phoneNumber,
                    address,
                    dateOfBirth,
                    employeeRole,
                    salary,
                    dateOfHire,
                    avatar,
                )
                .then((res) => {
                    setIsLoading(false);
                    addToast({
                        id: count,
                        message: res.data.data,
                    });

                    getEmployees();
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

    function handleSave(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();

        try {
            employee
                .storeEmployee(
                    stationID,
                    firstName,
                    secondName,
                    lastName,
                    phoneNumber,
                    address,
                    dateOfBirth,
                    employeeRole,
                    salary,
                    dateOfHire,
                    avatar,
                    companyID,
                )
                .then((res) => {
                    setIsLoading(false);
                    setStationID(Number(''));
                    setFirstName('');
                    setSecondName('');
                    setLastName('');
                    setPhoneNumber('');
                    setAddress('');
                    setDateOfBirth('');
                    setEmployeeRole('');
                    setSalary(Number(''));
                    setDateOfHire('');
                    setAvatar('');

                    addToast({
                        id: count,
                        message: res.data.data,
                    });

                    getEmployees();
                })
                .catch((err) => {
                    addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            // alert(e);
            setIsLoading(false);
        }

        setIsLoading(true);
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
                {editEmployee?.id === undefined ? (
                    <Modal.Title id="contained-modal-title-vcenter">New Employee</Modal.Title>
                ) : (
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit {editEmployee?.firstName} {editEmployee?.lastName}
                    </Modal.Title>
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
                    <Form.Row>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setFirstName(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="secondName">
                            <Form.Label>Second Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={secondName || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setSecondName(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col-lg-6 col-sm-12" controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g 080XXXXXXX3"
                                value={phoneNumber || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setPhoneNumber(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-6 col-sm-12" controlId="dateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateOfBirth || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setDateOfBirth(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="No. 6 Victoria Island way"
                            value={address || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="role">
                            <Form.Label>Employee Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g Janitor"
                                value={employeeRole || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setEmployeeRole(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control
                                type="text"
                                value={salary?.toString() || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setSalary(Number(e.target.value))
                                }
                            />
                        </Form.Group>
                        <Form.Group className="col-lg-4 col-sm-12" controlId="dateHired">
                            <Form.Label>Date of Hire</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateOfHire || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                    setDateOfHire(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Employee Image</Form.Label>
                        <Form.Control type="file" onChange={handleImage} />
                        <br />
                        <img className="avatar" alt="employee-avatar" src={imagePreviewUrl || null} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {editEmployee?.id === undefined ? (
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

EmployeeModal.propTypes = {
    show: PropTypes.bool,
    addToast: PropTypes.any,
    getEmployees: PropTypes.any,
    editEmployee: PropTypes.object,
    onHide: PropTypes.any,
    stations: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    stations: state.center.stations,
});

export default connect(mapStateToProps, { addToast })(EmployeeModal);
