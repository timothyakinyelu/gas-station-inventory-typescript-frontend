/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import authenticate from '../../api/authenticate';
import { RouteComponentProps } from 'react-router-dom';
import { updateSession } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { redirect } from '../../reusables/redirect';
import '../../styles/login.css';
import logo from '../../images/inTree.png';
import { addToast } from '../../redux/toast/actions';

interface LoginProps extends RouteComponentProps {
    updateSession: typeof updateSession;
    history: any;
    location: any;
    addToast: typeof addToast;
}

const Login: React.FC<LoginProps> = (props): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [hidden, setHidden] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);
    const [eye, setEye] = useState<boolean>(true);
    const count = Math.floor(Math.random() * 100 + 1);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
        setShow(true);
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        authenticate
            .Login(email, password)
            .then((res) => {
                const accessToken = res.data.token;
                const user = res.data.user;

                cookie.set('token', accessToken);

                props.updateSession({
                    isLoggedIn: true,
                    user: user,
                });
                setIsLoading(false);

                if (user) {
                    props.history.push(redirect(user.permission, user.company));
                }
            })
            .catch((err) => {
                console.log(err);
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        setIsLoading(true);
    };

    const toggleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        setHidden(!hidden);
        setEye(!eye);
    };

    return (
        <div className="container-fluid h-100 login">
            <div className="row h-100 d-flex align-items-center">
                <div className="formWrapper">
                    <Form className="loginWrapper p-4 rounded" onSubmit={handleLogin}>
                        <div
                            className="login-logo"
                            aria-label="logo"
                            style={{ width: '50%', paddingBottom: '10px', margin: 'auto' }}
                        >
                            <div className="login-header-inner" style={{ textAlign: 'center' }}>
                                <img src={logo} alt="logo" style={{ width: '60%', borderRadius: '40%' }} />
                            </div>
                        </div>
                        <div className="inputBox mb-4">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                />
                            </Form.Group>
                        </div>
                        <div className="inputBox mb-4 password">
                            <Form.Group>
                                <Form.Control
                                    type={hidden ? 'password' : 'text'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                />
                                {show && (
                                    <span className="show-hide">
                                        {eye ? (
                                            <i className="mdi mdi-eye-outline" onClick={toggleShow}></i>
                                        ) : (
                                            <i className="mdi mdi-eye-off-outline" onClick={toggleShow}></i>
                                        )}
                                    </span>
                                )}
                            </Form.Group>
                        </div>
                        <div className="inputBox mb-4">
                            <Button type="submit" bsPrefix="lgBtn" className="btn btn-default btn-block" block>
                                {isLoading && (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                )}
                                Sign In
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    updateSession: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    location: PropTypes.any.isRequired,
    addToast: PropTypes.any.isRequired,
};

export default connect(null, { updateSession, addToast })(Login);
