/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Metric } from '../../../redux/dashboard/types';
import PropTypes from 'prop-types';
import MonthSales from './MonthSales';

interface MonthSalesListProps {
    currentsales?: Metric[];
}

const MonthSalesList: React.FC<MonthSalesListProps> = ({ currentsales }): JSX.Element => {
    const [sales, setSales] = useState<Metric[]>([]);
    // const [key, setkey] = useState(false);
    // const size = useWindowSize();

    const figs = (): any => {
        return currentsales?.map((sale: Metric) => sale);
    };
    useEffect(() => {
        if (currentsales === undefined) {
            return;
        }
        setSales(figs());
    }, [currentsales]);

    return (
        <>
            {sales?.map((sale) => (
                <MonthSales key={sale.id} sale={sale} />
            ))}
        </>
    );
};

MonthSalesList.propTypes = {
    currentsales: PropTypes.any,
};

export default MonthSalesList;
