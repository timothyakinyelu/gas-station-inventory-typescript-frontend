import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import settings from '../../api/settings';
import '../../styles/Login.css';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToast } from '../../redux/toast/actions';

interface ResetPasswordProps {
    addToast: typeof addToast;
}

function PasswordReset(props: ResetPasswordProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const { token } = useParams();
    const count = Math.random() * 100 + 1;

    function validateForm(): boolean {
        return email.length > 0;
    }

    function checkPassword(): boolean {
        if (password !== passwordConfirmation) {
            alert("Passwords don't match");
        }

        return true;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        checkPassword();

        settings
            .passwordChange(token, email, password, passwordConfirmation)
            .then((res) => {
                props.addToast({
                    id: count,
                    message: res.data.status,
                });

                setIsLoading(false);
                setIsShown(true);
            })
            .catch((err) => {
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });

                setIsLoading(true);
            });

        setIsLoading(true);
    }

    return (
        <div className="changeWrapper container align-content-center">
            <div className="Login align-items-center">
                <div className="card ">
                    <div className="card-header">Change Password</div>
                    <div className="card-body">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter a valid email"
                                    value={email || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter a secure password"
                                    value={password || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="password must the same as above"
                                    value={passwordConfirmation || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group className="col-md-4">
                                    <Button className="btnSubmit" disabled={!validateForm()} type="submit">
                                        {isLoading && (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Reset
                                    </Button>
                                </Form.Group>
                                <Form.Group className="col-md-4 offset-md-6" style={{ paddingLeft: '0px' }}>
                                    {isShown && (
                                        <Button className="lg-show">
                                            <Link type="button" className="lg-text" to="/login">
                                                Login
                                            </Link>
                                        </Button>
                                    )}
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { addToast })(PasswordReset);
