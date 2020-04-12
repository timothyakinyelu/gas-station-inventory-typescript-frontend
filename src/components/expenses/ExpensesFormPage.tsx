/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { addToast } from '../../redux/toast/actions';
import expense from '../../api/expense';
import PropTypes from 'prop-types';
import ExpensesForm from './ExpensesForm';

interface ExpensesFormPageProps {
    addToast: typeof addToast;
    getDayExpenses: (stationID?: string, dateOfExpense?: string) => any;
}

const ExpensesFormPage: React.FC<ExpensesFormPageProps> = (props): JSX.Element => {
    const { addToast, getDayExpenses } = props;

    const count = Math.random() * 100 + 1;

    const handleSubmit = (stationID?: string, dateOfExpense?: string, items?: any[]): any => {
        expense
            .storeNewExpense(stationID, dateOfExpense, items)
            .then((res) => {
                addToast({
                    id: count,
                    message: res.data.success,
                });
                getDayExpenses(stationID, dateOfExpense);
            })
            .catch((err) => {
                addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
    };
    return (
        <>
            <div className="list-table">
                <div className="form-container">
                    <ExpensesForm handleSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
};

ExpensesFormPage.propTypes = {
    addToast: PropTypes.any,
    getDayExpenses: PropTypes.any,
};

export default connect(null, { addToast })(ExpensesFormPage);
