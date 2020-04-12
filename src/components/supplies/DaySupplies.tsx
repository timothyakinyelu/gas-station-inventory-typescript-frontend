import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { SuppliesState, Supplies } from '../../redux/supplies/types';
import DataTable from '../../reusables/partials/DataTable';
import PropTypes from 'prop-types';

interface DaySuppliesProps {
    daySupplies?: Supplies;
}

const DaySupplies: React.FC<DaySuppliesProps> = ({ daySupplies }): JSX.Element => {
    const items = daySupplies;

    return (
        <div className="list-table">
            <h5 title="sales_table" className="sales-table-header">
                Day Supplies Table
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

DaySupplies.propTypes = {
    daySupplies: PropTypes.any,
};

const mapStateToProps = (state: AppState): SuppliesState => ({
    daySupplies: state.suppliesRoot.daySupplies,
});

export default connect(mapStateToProps)(DaySupplies);
