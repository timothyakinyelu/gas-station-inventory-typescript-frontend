/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { AppState } from '../../redux';
import { Metric } from '../../redux/dashboard/types';
import { connect } from 'react-redux';
import MonthSalesList from './sales/MonthSalesList';
import PropTypes from 'prop-types';
import MonthExpensesList from './expenses/MonthExpensesList';

interface PerformanceProps {
    cMonthSales: Metric[];
    cMonthExpenses: Metric[];
}
const Performance: React.FC<PerformanceProps> = ({ cMonthSales, cMonthExpenses }): JSX.Element => {
    return (
        <>
            <div className="mb-3 card">
                <div className="card-header-tab card-header">
                    <div
                        className="card-header-title 
                        font-size-lg 
                        text-capitalize 
                        font-weight-normal"
                    >
                        <i className="header-icon"></i>
                        Service Outlets Performance for current month
                    </div>
                </div>
                <div className="no-gutters row">
                    <MonthSalesList currentsales={cMonthSales} />
                    <div className="divider d-sm-block"></div>
                    <MonthExpensesList currentexpenses={cMonthExpenses} />
                </div>
            </div>
        </>
    );
};

Performance.propTypes = {
    cMonthSales: PropTypes.any,
    cMonthExpenses: PropTypes.any,
};

const mapStateToProps = (state: AppState) => ({
    cMonthSales: state.metric.cMonthSales,
    cMonthExpenses: state.metric.cMonthExpenses,
});

export default connect(mapStateToProps)(Performance);
