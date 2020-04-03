import React from 'react';
import '../../styles/sales.css';
import Stations from '../../reusables/partials/Stations';
import { setStation } from '../../redux/central/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';

interface SalesProps {
    setStation: typeof setStation;
    station?: Station;
}

const Sales: React.FC<SalesProps> = (props): JSX.Element => {
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault();

        const index = e.target.selectedIndex;
        const station = e.target[index].getAttribute('data-name') || undefined;
        const value = parseInt(e.target.value);

        props.setStation({
            id: value,
            slug: station,
        });
    };

    return (
        <div className="sales-header">
            <h3 className="signage">Service Station Sales</h3>
            <Stations selectedStation={props.station} handleSelect={handleSelect} />
        </div>
    );
};

Sales.propTypes = {
    setStation: PropTypes.any,
    station: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    station: state.center.station,
});

export default connect(mapStateToProps, { setStation })(Sales);
