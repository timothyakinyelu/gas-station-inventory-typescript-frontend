/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import expense from '../../api/expense';
import { connect } from 'react-redux';
import { fetchDayExpenses } from '../../redux/expenses/actions';
import PropTypes from 'prop-types';
import ExpensesFormPage from '../../components/expenses/ExpensesFormPage';
import DayExpenses from '../../components/expenses/DayExpenses';

interface NewExpenseProps {
    fetchDayExpenses: typeof fetchDayExpenses;
}

const NewExpense: React.FC<NewExpenseProps> = (props): JSX.Element => {
    const { fetchDayExpenses } = props;

    function getDayExpenses(stationID?: string, dateOfExpense?: string): any {
        expense.getDayExpenses(stationID, dateOfExpense).then((res) => {
            fetchDayExpenses({
                dayExpenses: res.data,
            });
        });
    }

    return (
        <>
            <div className="sales-header">
                <h3 className="signage">New Expense</h3>
                <div className="card card-wrapper" style={{ marginTop: '20px' }}>
                    <ExpensesFormPage getDayExpenses={getDayExpenses} />
                    <DayExpenses />
                </div>
            </div>
        </>
    );
};

NewExpense.propTypes = {
    fetchDayExpenses: PropTypes.any,
};

export default connect(null, { fetchDayExpenses })(NewExpense);
