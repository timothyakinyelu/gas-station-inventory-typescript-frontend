/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/sales.css';
import Stations from '../../reusables/partials/Stations';
import { setStation } from '../../redux/central/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../redux';
import { CentralState, Station } from '../../redux/central/types';
import { useParams } from 'react-router-dom';
import Loader from '../../reusables/Loader';
import SalesList from '../../components/sales/SalesList';
import sale from '../../api/sale';
import { fetchStationSales } from '../../redux/sales/actions';

interface SalesProps {
    setStation: typeof setStation;
    fetchStationSales: typeof fetchStationSales;
    station?: Station;
    history: any;
}

const Sales: React.FC<SalesProps> = ({ setStation, station, history, fetchStationSales }): JSX.Element => {
    const { company, companyID, stationName, stationID } = useParams();
    const [isFetched, setIsFetched] = useState(true);
    // const isClicked = station?.isClicked;

    const getSalesByStation = useCallback(
        (id: number): void => {
            sale.getSalesByStation(id).then((res) => {
                fetchStationSales({
                    sales: res.data,
                });
                setIsFetched(true);
            });
        },
        [fetchStationSales],
    );

    useEffect(() => {
        const ac = new AbortController();

        if (stationID === undefined) {
            // setStation({
            //     id: Number(),
            //     slug: '',
            //     isClicked: false,
            // });
            return;
        }

        setStation({
            id: Number(stationID),
            slug: stationName,
            isClicked: true,
        });
        getSalesByStation(Number(stationID));
        setIsFetched(false);

        return function cleanup(): void {
            setIsFetched(true);
            ac.abort();
        };
    }, [stationID, setStation, stationName, getSalesByStation]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        e.preventDefault();

        const index = e.target.selectedIndex;
        const station = e.target[index].getAttribute('data-name') || undefined;
        const value = parseInt(e.target.value);

        setStation({
            id: value,
            slug: station,
            isClicked: true,
        });

        setIsFetched(false);
        if (!isFetched) {
            getSalesByStation(value);
        }

        history.push('/' + companyID + '/' + company + '/sales/' + value + '/' + station);
    };

    return (
        <div className="sales-header">
            <h3 className="signage">Service Station Sales</h3>
            <Stations selectedStation={station} handleSelect={handleSelect} />

            {!isFetched ? (
                <div className="list-table">
                    <Loader />
                </div>
            ) : (
                station !== {} && <SalesList station={station} />
            )}
        </div>
    );
};

Sales.propTypes = {
    setStation: PropTypes.any,
    fetchStationSales: PropTypes.any,
    station: PropTypes.any,
    history: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    station: state.center.station,
});

export default connect(mapStateToProps, { setStation, fetchStationSales })(Sales);
