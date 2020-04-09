/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { StocksState, Stocks, FETCH_STATION_STOCKS } from '../../redux/stocks/types';
import { connect, useDispatch } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import stock from '../../api/stock';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addToast } from '../../redux/toast/actions';

interface StocksListProps {
    station?: Station;
    stocks?: Stocks;
    getStocks: (value?: number) => void;
    handleEdit: (value?: number) => void;
    addToast: typeof addToast;
}
const StocksList: React.FC<StocksListProps> = (props): JSX.Element => {
    const { stocks, station } = props;
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = stocks;
    const count = Math.random() * 100 + 1;

    const history = useHistory();
    const dispatch = useDispatch();
    const { companyID, company, stationID, stationName } = useParams();

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            stock.getStocksByStation(Number(stationID), pageNumber).then((res) => {
                dispatch({
                    type: FETCH_STATION_STOCKS,
                    payload: {
                        stocks: res.data,
                    },
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/stocks/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [dispatch, history, companyID, company, stationID, stationName],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    useEffect(() => {
        const ac = new AbortController();
        if (!page) {
            return;
        }

        fetchData(page);
        changePage(page);
        return function cleanup(): void {
            ac.abort();
        };
    }, [page, changePage, fetchData]);

    const deleteSelected = (data?: any[]): void => {
        stock.deleteStock(data).then((res) => {
            addToast({
                id: count,
                message: res.data.status,
            });
            props.getStocks();
        });
    };

    return (
        <div className="list-table">
            {name && (
                <>
                    <h5 title={name} className="sales-table-header">
                        {name} Stocks Table
                    </h5>
                    <div className="list-table-inner">
                        {items?.data === undefined || items?.data.length < 0 ? (
                            <h5>No Records Available!</h5>
                        ) : (
                            <DataTable
                                items={items}
                                name={name}
                                changePage={changePage}
                                deleteSelected={deleteSelected}
                                handleEdit={props.handleEdit}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

StocksList.propTypes = {
    station: PropTypes.any,
    stocks: PropTypes.any,
    addToast: PropTypes.any,
    getStocks: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): StocksState => ({
    stocks: state.stocksRoot.stocks,
});

export default connect(mapStateToProps, { addToast })(StocksList);
