import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import settings from '../../api/settings';
import '../../styles/login.css';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToast } from '../../redux/toast/actions';
import '../../styles/password.css';

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

                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
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
        <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Reset Password</span>
            <Form className="login100-form validate-form p-b-33 p-t-5" onSubmit={handleSubmit}>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <Form.Control
                        className="input100"
                        type="email"
                        placeholder="Enter a valid email"
                        value={email || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                    />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <Form.Control
                        className="input100"
                        type="password"
                        placeholder="Enter a secure password"
                        value={password || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
                    />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter username">
                    <Form.Control
                        className="input100"
                        type="password"
                        placeholder="Enter password again"
                        value={passwordConfirmation || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                </div>
                <div className="container-login100-form-btn m-t-32">
                    <Form.Row>
                        {!isShown && (
                            <Form.Group className="">
                                <Button
                                    className="btnSubmit login100-form-btn"
                                    disabled={!validateForm()}
                                    type="submit"
                                >
                                    {isLoading && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    )}
                                    Reset Password
                                </Button>
                            </Form.Group>
                        )}
                        {isShown && (
                            <Form.Group className="" style={{ paddingLeft: '0px' }}>
                                <Button className="lg-show login100-form-btn">
                                    <Link type="button" className="lg-text" to="/login">
                                        Login
                                    </Link>
                                </Button>
                            </Form.Group>
                        )}
                    </Form.Row>
                </div>
            </Form>
        </div>
    );
}

export default connect(null, { addToast })(PasswordReset);
