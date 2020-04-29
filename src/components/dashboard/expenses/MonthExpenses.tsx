import React from 'react';
import { Metric, Data } from '../../../redux/dashboard/types';
import PropTypes from 'prop-types';

interface MonthExpensesProps {
    expense: Metric;
}

const MonthExpenses: React.FC<MonthExpensesProps> = ({ expense }): JSX.Element => {
    return (
        <div className="col-sm-12 col-md-6">
            <h6 className="outlet-name">{expense.name}</h6>
            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="widget-chart-content">
                    {expense.data &&
                        expense.data.map((item: Data, index: number) => {
                            return (
                                <div key={index}>
                                    <div id="perf-expense" className="widget-numbers">
                                        ₦{item.totalExpense?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="divider m-0 d-md-none d-sm-block"></div>
            </div>
        </div>
    );
};

MonthExpenses.propTypes = {
    expense: PropTypes.any,
};

export default MonthExpenses;
