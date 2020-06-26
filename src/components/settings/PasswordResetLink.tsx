import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import settings from '../../api/settings';
import '../../styles/login.css';
import { connect } from 'react-redux';
import { addToast } from '../../redux/toast/actions';

interface ResetLinkProps {
    addToast: typeof addToast;
}

function PasswordResetLink(props: ResetLinkProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const count = Math.random() * 100 + 1;

    function validateForm(): boolean {
        return email?.length > 0;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        setIsLoading(true);

        settings
            .sendEmailLink(email)
            .then((res) => {
                // setSuccess(res.data.data);
                props.addToast({
                    id: count,
                    message: res.data.data,
                });

                setIsLoading(false);
            })
            .catch((err) => {
                // setError(err.response.data.error);
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });

                setIsLoading(true);
            });
    }

    return (
        <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Request Password Change</span>
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
                <div className="container-login100-form-btn m-t-32">
                    <Form.Group>
                        <Button className="btnSubmit" disabled={!validateForm()} type="submit">
                            {isLoading && (
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            )}
                            Request Link
                        </Button>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}

export default connect(null, { addToast })(PasswordResetLink);
