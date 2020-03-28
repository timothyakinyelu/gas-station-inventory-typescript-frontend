/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { AppState } from '../../redux';
import { Metric } from '../../redux/dashboard/types';
import { connect } from 'react-redux';
import MonthSalesList from './sales/MonthSalesList';
import PropTypes from 'prop-types';

interface PerformanceProps {
    cMonthSales: Metric[];
}
const Performance: React.FC<PerformanceProps> = ({ cMonthSales }): JSX.Element => {
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
                        Service Outlets Performance
                    </div>
                </div>
                <div className="no-gutters row">
                    <MonthSalesList currentsales={cMonthSales} />
                    <div className="divider d-sm-block"></div>
                </div>
            </div>
        </>
    );
};

Performance.propTypes = {
    cMonthSales: PropTypes.any,
};

const mapStateToProps = (state: AppState) => ({
    cMonthSales: state.metric.cMonthSales,
});

export default connect(mapStateToProps)(Performance);
