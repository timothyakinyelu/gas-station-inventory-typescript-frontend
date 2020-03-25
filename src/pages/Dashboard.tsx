import React, { useEffect, useCallback } from 'react';
import metric from '../api/metric';
import { currentMonthSales, currentMonthExpenses, monthSales } from '../redux/dashboard/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

interface DashboardProps {
    currentMonthSales: typeof currentMonthSales;
    currentMonthExpenses: typeof currentMonthExpenses;
    monthSales: typeof monthSales;
}

const Dashboard: React.FC<DashboardProps> = ({ currentMonthExpenses, currentMonthSales, monthSales }): JSX.Element => {
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

    const getAllMonthsSale = useCallback((): void => {
        metric.getAllMonthsSale().then((res) => {
            monthSales(res.data);
        });
    }, [monthSales]);

    useEffect(() => {
        getCurrentSales();
        getExpensesByCurrentMonth();
        getAllMonthsSale();
    }, [getCurrentSales, getExpensesByCurrentMonth, getAllMonthsSale]);

    return <h4>Dashboard</h4>;
};

Dashboard.propTypes = {
    currentMonthSales: PropTypes.any.isRequired,
    currentMonthExpenses: PropTypes.any.isRequired,
    monthSales: PropTypes.any.isRequired,
};

export default connect(null, { currentMonthSales, currentMonthExpenses, monthSales })(Dashboard);
