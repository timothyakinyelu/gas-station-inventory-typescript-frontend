/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Metric } from '../../../redux/dashboard/types';
import PropTypes from 'prop-types';
import MonthExpenses from './MonthExpenses';

interface MonthExpensesListProps {
    currentexpenses?: Metric[];
}

const MonthExpensesList: React.FC<MonthExpensesListProps> = ({ currentexpenses }): JSX.Element => {
    const [expenses, setExpenses] = useState<Metric[]>([]);

    useEffect(() => {
        if (currentexpenses === undefined) {
            return;
        }
        setExpenses(currentexpenses?.map((expense: Metric) => expense));
    }, [currentexpenses]);

    return (
        <>
            {expenses?.map((expense) => (
                <MonthExpenses key={expense.id} expense={expense} />
            ))}
        </>
    );
};

MonthExpensesList.propTypes = {
    currentexpenses: PropTypes.any,
};

export default MonthExpensesList;
