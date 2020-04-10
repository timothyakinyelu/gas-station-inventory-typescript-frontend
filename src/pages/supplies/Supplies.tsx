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
import SuppliesList from '../../components/supplies/SuppliesList';
import supply from '../../api/supply';
import { fetchStationSupplies, fetchSupplyToEdit } from '../../redux/supplies/actions';
import { addToast } from '../../redux/toast/actions';
import EditSupplyModal from '../../components/supplies/EditSupplyModal';
import product from '../../api/product';
import { Products } from '../../redux/products/types';

interface SuppliesProps {
    setStation: typeof setStation;
    fetchStationSupplies: typeof fetchStationSupplies;
    fetchSupplyToEdit: typeof fetchSupplyToEdit;
    addToast: typeof addToast;
    station?: Station;
    history: any;
}

const Supplies: React.FC<SuppliesProps> = (props): JSX.Element => {
    const { setStation, station, history, fetchStationSupplies, fetchSupplyToEdit } = props;

    const { company, companyID, stationName, stationID } = useParams();
    const [isFetched, setIsFetched] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Products>({});

    const count = Math.random() * 100 + 1;

    const getSuppliesByStation = useCallback(
        (id?: number): void => {
            supply.getSuppliesByStation(id).then((res) => {
                fetchStationSupplies({
                    supplies: res.data,
                });
                setIsFetched(true);
                setIsLoading(false);
            });
        },
        [fetchStationSupplies],
    );

    const getProducts = useCallback((): void => {
        product.getProducts(companyID).then((res) => {
            setProducts(res.data);
            setIsLoading(false);
        });
    }, [companyID]);

    useEffect(() => {
        const ac = new AbortController();

        if (stationID === undefined) {
            setStation({
                id: Number(),
                slug: '',
                isClicked: false,
            });
            return;
        }

        setStation({
            id: Number(stationID),
            slug: stationName,
            isClicked: true,
        });
        getSuppliesByStation(Number(stationID));
        getProducts();
        setIsFetched(false);

        return function cleanup(): void {
            setIsFetched(true);
            ac.abort();
        };
    }, [stationID, setStation, stationName, getSuppliesByStation, getProducts]);

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
            getSuppliesByStation(value);
        }

        history.push('/' + companyID + '/' + company + '/supplies/' + value + '/' + station);
    };

    const handleHide = (): void => {
        setModalShow(false);
        setLoading(true);
        fetchSupplyToEdit({
            editSupply: {},
        });
    };

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        try {
            supply
                .editSupply(id)
                .then((res) => {
                    fetchSupplyToEdit({
                        editSupply: res.data.supply,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    props.addToast({
                        id: count,
                        message: err.response.data.error,
                    });
                });
        } catch (e) {
            console.log(e.response);
        }
    };

    return (
        <div className="sales-header">
            <h3 className="signage">Service Station Supplies</h3>
            <Stations selectedStation={station} handleSelect={handleSelect} />
            {!isFetched ? (
                <div className="list-table">
                    <Loader />
                </div>
            ) : (
                <>
                    {!isLoading && (
                        <SuppliesList station={station} getSupplies={getSuppliesByStation} handleEdit={handleEdit} />
                    )}
                    {!loading && (
                        <EditSupplyModal
                            show={modalShow}
                            onHide={handleHide}
                            getSupplies={getSuppliesByStation}
                            products={products}
                        />
                    )}
                </>
            )}
        </div>
    );
};

Supplies.propTypes = {
    setStation: PropTypes.any,
    fetchStationSupplies: PropTypes.any,
    fetchSupplyToEdit: PropTypes.any,
    addToast: PropTypes.any,
    station: PropTypes.any,
    history: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    station: state.center.station,
});

export default connect(mapStateToProps, { setStation, fetchStationSupplies, fetchSupplyToEdit, addToast })(Supplies);
