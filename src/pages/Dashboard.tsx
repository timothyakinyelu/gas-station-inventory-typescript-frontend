import React, { useEffect, useCallback, useState } from 'react';
import metric from '../api/metric';
import { currentMonthSales, currentMonthExpenses, chartInfo } from '../redux/dashboard/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from '../components/dashboard/Graph';
import Loader from '../reusables/Loader';
import Performance from '../components/dashboard/Performance';
import { useParams } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/loader.css';

interface DashboardProps {
    currentMonthSales: typeof currentMonthSales;
    currentMonthExpenses: typeof currentMonthExpenses;
    chartInfo: typeof chartInfo;
}

const Dashboard: React.FC<DashboardProps> = ({ currentMonthExpenses, currentMonthSales, chartInfo }): JSX.Element => {
    const { companyID } = useParams();
    const [isSet, setIsSet] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const getCurrentSales = useCallback((): void => {
        metric.getSalesByCurrentMonth(companyID).then((res) => {
            currentMonthSales(res.data);
        });
    }, [currentMonthSales, companyID]);

    const getExpensesByCurrentMonth = useCallback((): void => {
        metric.getExpensesByCurrentMonth(companyID).then((res) => {
            currentMonthExpenses(res.data);
        });
    }, [currentMonthExpenses, companyID]);

    const getDataByMonth = useCallback((): void => {
        metric.getDataByMonth(companyID).then((res) => {
            chartInfo(res.data);
            setIsSet(true);
        });
    }, [chartInfo, companyID]);

    useEffect(() => {
        const ac = new AbortController();

        getCurrentSales();
        getExpensesByCurrentMonth();
        getDataByMonth();

        setHasLoaded(true);

        return function cleanup(): void {
            ac.abort();
        };
    }, [getCurrentSales, getExpensesByCurrentMonth, getDataByMonth]);

    return (
        <>
            {!hasLoaded ? (
                <Loader />
            ) : (
                <>
                    <div className="charts">
                        <Performance />
                    </div>
                    <div className="charts">
                        <div className="list-table-inner card">
                            <div className="card-header" style={{ fontSize: '1.3rem' }}>
                                Sales/Expense Chart
                            </div>
                            {isSet && <Graph />}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

Dashboard.propTypes = {
    currentMonthSales: PropTypes.any.isRequired,
    currentMonthExpenses: PropTypes.any.isRequired,
    chartInfo: PropTypes.any.isRequired,
};

export default connect(null, { currentMonthSales, currentMonthExpenses, chartInfo })(Dashboard);
