import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { StocksState, Stocks } from '../../redux/stocks/types';
import DataTable from '../../reusables/partials/DataTable';
import PropTypes from 'prop-types';

interface DayStocksProps {
    dayStocks?: Stocks;
}

const DayStocks: React.FC<DayStocksProps> = ({ dayStocks }): JSX.Element => {
    const items = dayStocks;

    return (
        <div className="list-table">
            <h5 title="sales_table" className="sales-table-header">
                Day Stocks Table
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

DayStocks.propTypes = {
    dayStocks: PropTypes.any,
};

const mapStateToProps = (state: AppState): StocksState => ({
    dayStocks: state.stocksRoot.dayStocks,
});

export default connect(mapStateToProps)(DayStocks);
