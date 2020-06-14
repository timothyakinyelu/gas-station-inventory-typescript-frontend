/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Expense } from '../../redux/expenses/types';
import expense from '../../api/expense';
import { addToast } from '../../redux/toast/actions';
import { connect } from 'react-redux';

interface EditExpenseModalProps {
    handleLoad: () => void;
    showEdit?: Expense;
    addToast: typeof addToast;
    show?: boolean;
    onHide?: () => void;
}

const EditExpenseModal: React.FC<EditExpenseModalProps> = (props): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const [amount, setAmount] = useState<number>();
    const [reference, setReference] = useState<string | undefined>('');
    const [expenseDate, setExpenseDate] = useState<string | undefined>('');

    const { handleLoad, showEdit, addToast, ...rest } = props;
    const count = Math.random() * 100 + 1;

    useEffect(() => {
        if (!showEdit) {
            return;
        }

        setAmount(showEdit?.amount);
        setReference(showEdit?.description);
        setExpenseDate(showEdit?.expense_date);
    }, [showEdit]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        const expenseID = showEdit?.id;
        try {
            expense
                .updateDayExpense(expenseID, amount, reference, expenseDate)
                .then((res) => {
                    setIsLoading(false);

                    addToast({
                        id: count,
                        message: res.data.success,
                    });

                    handleLoad();
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
    };

    return (
        <Modal {...rest} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Sale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="text"
                            value={amount?.toString() || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                setAmount(Number(e.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="ref">
                        <Form.Label>Reference</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={reference || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setReference(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="expenseDate">
                        <Form.Label>Expense Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={expenseDate || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setExpenseDate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modal-button btnSubmit" onClick={handleSubmit}>
                    {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

EditExpenseModal.propTypes = {
    handleLoad: PropTypes.any,
    showEdit: PropTypes.any,
    addToast: PropTypes.any,
    show: PropTypes.bool,
    onHide: PropTypes.any,
};

export default connect(null, { addToast })(EditExpenseModal);
