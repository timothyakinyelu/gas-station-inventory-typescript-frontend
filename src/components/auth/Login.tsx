/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import authenticate from '../../api/authenticate';
import { RouteComponentProps } from 'react-router-dom';
import { updateSession } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { AppState } from '../../redux';
import { redirect } from '../../reusables/redirect';
import '../../styles/login.css';
import logo from '../../images/inTree.png';

interface LoginProps extends RouteComponentProps {
    updateSession: typeof updateSession;
    history: any;
    location: any;
    isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = (props): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        authenticate
            .Login(email, password)
            .then((res) => {
                const accessToken = res.data.access_token;
                const user = res.data.user.original;

                cookie.set('token', accessToken);

                props.updateSession({
                    isLoggedIn: true,
                    user: user,
                });

                if (user) {
                    if (props.location.state === undefined) {
                        props.history.push(redirect(user.permission));
                    } else {
                        const { requestedPath } = props.location.state;
                        props.history.push(requestedPath);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                {/* <Form.Label>Email</Form.Label> */}
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
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                />
                            </Form.Group>
                        </div>
                        <div className="inputBox mb-4">
                            <Button type="submit" bsPrefix="lgBtn" className="btn btn-default btn-block" block>
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
    isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { updateSession })(Login);
