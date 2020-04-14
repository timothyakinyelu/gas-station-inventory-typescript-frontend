import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import settings from '../../api/settings';
import '../../styles/Login.css';
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
        <div className="changeWrapper container align-content-center">
            <div className="Login align-items-center">
                <div className="card ">
                    <div className="card-header">Reset Password</div>
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
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { addToast })(PasswordResetLink);
