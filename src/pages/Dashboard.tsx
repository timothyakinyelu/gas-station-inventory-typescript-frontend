import React, { useEffect, useCallback, useState } from 'react';
import metric from '../api/metric';
import { currentMonthSales, currentMonthExpenses, chartInfo } from '../redux/dashboard/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Graph from '../components/dashboard/Graph';

interface DashboardProps {
    currentMonthSales: typeof currentMonthSales;
    currentMonthExpenses: typeof currentMonthExpenses;
    chartInfo: typeof chartInfo;
}

const Dashboard: React.FC<DashboardProps> = ({ currentMonthExpenses, currentMonthSales, chartInfo }): JSX.Element => {
    const [isSet, setIsSet] = useState<boolean>(false);
    const getCurrentSales = useCallback((): void => {
        metric.getSalesByCurrentMonth().then((res) => {
            currentMonthSales(res.data);
        });
    }, [currentMonthSales]);

    const getExpensesByCurrentMonth = useCallback((): void => {
        metric.getExpensesByCurrentMonth().then((res) => {
            currentMonthExpenses(res.data);
        });
    }, [currentMonthExpenses]);

    const getDataByMonth = useCallback((): void => {
        metric.getDataByMonth().then((res) => {
            chartInfo(res.data);
            setIsSet(true);
        });
    }, [chartInfo]);

    useEffect(() => {
        getCurrentSales();
        getExpensesByCurrentMonth();
        getDataByMonth();
    }, [getCurrentSales, getExpensesByCurrentMonth, getDataByMonth]);

    return <>{isSet && <Graph />}</>;
};

Dashboard.propTypes = {
    currentMonthSales: PropTypes.any.isRequired,
    currentMonthExpenses: PropTypes.any.isRequired,
    chartInfo: PropTypes.any.isRequired,
};

export default connect(null, { currentMonthSales, currentMonthExpenses, chartInfo })(Dashboard);
