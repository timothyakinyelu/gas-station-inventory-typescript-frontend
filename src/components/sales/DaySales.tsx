import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { SalesState, Sales } from '../../redux/sales/types';
import DataTable from '../../reusables/partials/DataTable';
import PropTypes from 'prop-types';

interface DaySalesProps {
    daySales?: Sales;
}

const DaySales: React.FC<DaySalesProps> = ({ daySales }): JSX.Element => {
    const items = daySales;

    return (
        <div className="list-table">
            <h5 title="sales_table" className="sales-table-header">
                Day Sales Table
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

DaySales.propTypes = {
    daySales: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    daySales: state.salesRoot.daySales,
});

export default connect(mapStateToProps)(DaySales);
