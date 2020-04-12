import React from 'react';
import { ExpensesState, Expenses } from '../../redux/expenses/types';
import { AppState } from '../../redux';
import PropTypes from 'prop-types';
import DataTable from '../../reusables/partials/DataTable';
import { connect } from 'react-redux';

interface DayExpensesProps {
    dayExpenses?: Expenses;
}

const DayExpenses: React.FC<DayExpensesProps> = ({ dayExpenses }): JSX.Element => {
    const items = dayExpenses;

    return (
        <div className="list-table">
            <h5 title="sales_table" className="sales-table-header">
                Day Expenses Table
            </h5>
            <div className="list-table-inner">
                {items?.data === undefined || items?.data.length < 0 ? (
                    <h6>No Records Available!</h6>
                ) : (
                    <DataTable items={items} />
                )}
            </div>
        </div>
    );
};

DayExpenses.propTypes = {
    dayExpenses: PropTypes.any,
};

const mapStateToProps = (state: AppState): ExpensesState => ({
    dayExpenses: state.expensesRoot.dayExpenses,
});

export default connect(mapStateToProps)(DayExpenses);
