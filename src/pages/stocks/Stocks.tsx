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
import StocksList from '../../components/stocks/StocksList';
import stock from '../../api/stock';
import { fetchStationStocks, fetchStockToEdit } from '../../redux/stocks/actions';
import { addToast } from '../../redux/toast/actions';
import EditStockModal from '../../components/stocks/EditStockModal';
import product from '../../api/product';
import { Products } from '../../redux/products/types';

interface StocksProps {
    setStation: typeof setStation;
    fetchStationStocks: typeof fetchStationStocks;
    fetchStockToEdit: typeof fetchStockToEdit;
    addToast: typeof addToast;
    station?: Station;
    history: any;
}

const Stocks: React.FC<StocksProps> = (props): JSX.Element => {
    const { setStation, station, history, fetchStationStocks, fetchStockToEdit } = props;

    const { company, companyID, stationName, stationID } = useParams();
    const [isFetched, setIsFetched] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Products>({});

    const count = Math.random() * 100 + 1;

    const getStocksByStation = useCallback(
        (id?: number): void => {
            stock.getStocksByStation(id).then((res) => {
                fetchStationStocks({
                    stocks: res.data,
                });
                setIsFetched(true);
                setIsLoading(false);
            });
        },
        [fetchStationStocks],
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
        getStocksByStation(Number(stationID));
        getProducts();
        setIsFetched(false);

        return function cleanup(): void {
            setIsFetched(true);
            ac.abort();
        };
    }, [stationID, setStation, stationName, getStocksByStation, getProducts]);

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
            getStocksByStation(value);
        }

        history.push('/' + companyID + '/' + company + '/stocks/' + value + '/' + station);
    };

    const handleHide = (): void => {
        setModalShow(false);
        setLoading(true);
        fetchStockToEdit({
            editStock: {},
        });
    };

    const handleEdit = (id?: number): void => {
        setModalShow(true);
        setLoading(true);
        // try {
        stock
            .editStock(id)
            .then((res) => {
                fetchStockToEdit({
                    editStock: res.data.stock,
                });
                setLoading(false);
            })
            .catch((err) => {
                props.addToast({
                    id: count,
                    message: err.response.data.error,
                });
            });
        // } catch (e) {
        //     console.log(e.response);
        // }
    };

    return (
        <div className="sales-header">
            <h3 className="signage">Service Station Stocks</h3>
            <Stations selectedStation={station} handleSelect={handleSelect} />
            {!isFetched ? (
                <div className="list-table">
                    <Loader />
                </div>
            ) : (
                <>
                    {!isLoading && (
                        <StocksList station={station} getStocks={getStocksByStation} handleEdit={handleEdit} />
                    )}
                    {!loading && (
                        <EditStockModal
                            show={modalShow}
                            onHide={handleHide}
                            getStocks={getStocksByStation}
                            products={products}
                        />
                    )}
                </>
            )}
        </div>
    );
};

Stocks.propTypes = {
    setStation: PropTypes.any,
    fetchStationStocks: PropTypes.any,
    fetchStockToEdit: PropTypes.any,
    addToast: PropTypes.any,
    station: PropTypes.any,
    history: PropTypes.any,
};

const mapStateToProps = (state: AppState): CentralState => ({
    station: state.center.station,
});

export default connect(mapStateToProps, { setStation, fetchStationStocks, fetchStockToEdit, addToast })(Stocks);
