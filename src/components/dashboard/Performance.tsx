/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useCallback } from 'react';
import { AppState } from '../../redux';
import { Metric, MetricState } from '../../redux/dashboard/types';
import { connect } from 'react-redux';
import MonthSalesList from './sales/MonthSalesList';
import PropTypes from 'prop-types';
import MonthExpensesList from './expenses/MonthExpensesList';
import TermPicker from '../../reusables/partials/TermPicker';
import { currentMonthSales, currentMonthExpenses } from '../../redux/dashboard/actions';
import metric from '../../api/metric';
import { useParams } from 'react-router-dom';

interface PerformanceProps {
    cMonthSales?: Metric[];
    cMonthExpenses?: Metric[];
    currentMonthSales: typeof currentMonthSales;
    currentMonthExpenses: typeof currentMonthExpenses;
}

const Performance: React.FC<PerformanceProps> = ({
    cMonthSales,
    cMonthExpenses,
    currentMonthExpenses,
    currentMonthSales,
}): JSX.Element => {
    const { companyID } = useParams();

    const getStationExpensesByDate = useCallback(
        (range: any[]): void => {
            const from = range[0].startValue;
            const to = range[0].endValue;

            metric.getStationExpensesByDate(companyID, from, to).then((res) => {
                currentMonthExpenses(res.data);
            });
        },
        [currentMonthExpenses, companyID],
    );

    const getStationSalesByDate = useCallback(
        (range: any[]): void => {
            const from = range[0].startValue;
            const to = range[0].endValue;

            metric.getStationSalesByDate(companyID, from, to).then((res) => {
                currentMonthSales(res.data);
            });
        },
        [currentMonthSales, companyID],
    );

    const handleSelection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        getStationExpensesByDate([e.target]);
        getStationSalesByDate([e.target]);
    };

    useEffect(() => {
        const ac = new AbortController();

        if (cMonthSales === [] || cMonthExpenses === []) {
            return;
        }

        return function cleanup(): void {
            ac.abort();
        };
    }, [cMonthSales, cMonthExpenses]);

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
                    <TermPicker
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => handleSelection(e)}
                    />
                </div>
                <div className="perf-card" style={{ alignSelf: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                    <div className="" style={{ display: 'inline-flex' }}>
                        <div>
                            <h5 className="widget-subheading">Revenue</h5>
                            <div className="row" style={{ margin: 'auto' }}>
                                <MonthSalesList currentsales={cMonthSales} />
                            </div>
                        </div>
                        <div className="divider m-0 d-sm-block"></div>
                        <div>
                            <h5 className="widget-subheading">Expenses</h5>
                            <div className="row" style={{ margin: 'auto' }}>
                                <MonthExpensesList currentexpenses={cMonthExpenses} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Performance.propTypes = {
    cMonthSales: PropTypes.any,
    cMonthExpenses: PropTypes.any,
    currentMonthSales: PropTypes.any,
    currentMonthExpenses: PropTypes.any,
};

const mapStateToProps = (state: AppState): MetricState => ({
    cMonthSales: state.metric.cMonthSales,
    cMonthExpenses: state.metric.cMonthExpenses,
});

export default connect(mapStateToProps, { currentMonthSales, currentMonthExpenses })(Performance);
