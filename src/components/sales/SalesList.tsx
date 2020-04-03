import React, { useEffect, useState } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { SalesState, SalesSum } from '../../redux/sales/types';
import { connect } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';

interface SalesListProps {
    station?: Station;
    sales?: SalesSum;
}
const SalesList: React.FC<SalesListProps> = ({ station, sales }): JSX.Element => {
    const str = station?.slug;
    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const [items, setItems] = useState<SalesSum>();

    const val = sales;

    useEffect(() => {
        if (!sales) {
            return;
        }
        setItems(val);
    }, [sales]);
    return (
        <div className="list-table">
            {name && (
                <>
                    <h5 title={name} className="sales-table-header">
                        {name} Sales Table
                    </h5>
                    <div className="list-table-inner">
                        {items?.data !== [] ? <DataTable /> : <h5>No Records Available!</h5>}
                    </div>
                </>
            )}
        </div>
    );
};

SalesList.propTypes = {
    station: PropTypes.any,
    sales: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    sales: state.salesRoot.sales,
});

export default connect(mapStateToProps)(SalesList);
