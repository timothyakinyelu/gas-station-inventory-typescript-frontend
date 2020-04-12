/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

interface ExpensesFormProps {
    handleSubmit: (stationID?: string, dateOfInventory?: string, items?: any[]) => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = (props): JSX.Element => {
    const { handleSubmit } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [dateOfExpense, setDateOfExpense] = useState('');

    const [items, setItems] = useState([
        {
            amount: Number(),
            reference: '',
        },
    ]);

    const { stationID } = useParams();

    const handleAmountChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                amount: Number(evt.target.value),
            };
        });

        setItems(newItems);
    };

    const handleReferenceChange = (idx: number) => (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const newItems = items.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {
                ...item,
                reference: evt.target.value,
            };
        });

        setItems(newItems);
    };

    const handleAddItem = (): void => {
        setItems(
            items.concat([
                {
                    amount: Number(),
                    reference: '',
                },
            ]),
        );
    };

    const handleRemoveItem = (idx: number) => (): void => {
        setItems(items.filter((s, sidx) => idx !== sidx));
    };

    const addExpense = (
        evt: React.FormEvent<HTMLFormElement>,
        stationID?: string,
        dateOfExpense?: string,
        items?: any[],
    ): void => {
        evt.preventDefault();

        setIsLoading(true);
        handleSubmit(stationID, dateOfExpense, items);

        setTimeout(() => {
            setItems([
                {
                    amount: Number(),
                    reference: '',
                },
            ]);

            setDateOfExpense('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Form
            onSubmit={(evt: React.FormEvent<HTMLFormElement>): void => addExpense(evt, stationID, dateOfExpense, items)}
        >
            <Form.Group
                className="col-lg-4 col-sm-4"
                style={{ paddingLeft: '0px', paddingRight: '0px' }}
                controlId="dateSale"
            >
                <Form.Label>Date of Expense</Form.Label>
                <Form.Control
                    type="date"
                    value={dateOfExpense || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDateOfExpense(e.target.value)}
                />
            </Form.Group>
            {items.map((item, idx) => (
                <Form.Row key={`${idx + 1}`}>
                    <Form.Group className="col-lg-4 col-sm-4" controlId="eST">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="text"
                            style={{ width: '100%' }}
                            value={item.amount.toString() || ''}
                            onChange={handleAmountChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group className="col-lg-6 col-sm-6" controlId="rD">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                            style={{ width: '100%' }}
                            type="text"
                            value={item.reference || ''}
                            onChange={handleReferenceChange(idx)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={handleRemoveItem(idx)} className="small btnRemove">
                            X
                        </Button>
                    </Form.Group>
                </Form.Row>
            ))}
            <Button onClick={handleAddItem} className="addBtn">
                <i className="fa fa-plus"></i>
            </Button>
            <Button className="float-right btnSubmit" variant="primary" type="submit">
                {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                Submit
            </Button>
        </Form>
    );
};

ExpensesForm.propTypes = {
    handleSubmit: PropTypes.any,
};

export default ExpensesForm;
