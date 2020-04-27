/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback, useState } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { StocksState, Stocks } from '../../redux/stocks/types';
import { connect } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import stock from '../../api/stock';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { addToast } from '../../redux/toast/actions';
import Search from '../../reusables/partials/Search';
import { inTreeApi } from '../../config';
import { debounce } from 'lodash';
import { fetchStationStocks } from '../../redux/stocks/actions';

interface StocksListProps {
    fetchStationStocks: typeof fetchStationStocks;
    station?: Station;
    stocks?: Stocks;
    getStocks: (value?: number) => void;
    handleEdit: (value?: number) => void;
    addToast: typeof addToast;
}
const StocksList: React.FC<StocksListProps> = (props): JSX.Element => {
    const { stocks, station, fetchStationStocks } = props;
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = stocks;
    const count = Math.random() * 100 + 1;

    const history = useHistory();

    const { companyID, company, stationID, stationName } = useParams();
    const [term, setTerm] = useState<string | undefined>('');

    function useQuery(): any {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const page = query.get('page');

    const fetchData = useCallback(
        (pageNumber: number): any => {
            stock.getStocksByStation(Number(stationID), pageNumber).then((res) => {
                fetchStationStocks({
                    stocks: res.data,
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/stocks/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [history, companyID, company, stationID, stationName, fetchStationStocks],
    );

    const changePage = useCallback(
        (pageNumber: number): void => {
            if (pageNumber) {
                fetchData(pageNumber);
            }
        },
        [fetchData],
    );

    const sendQuery = (query: string): void => {
        if (term === undefined) return;
        if (term?.length > -1) {
            const requestOptions = {
                params: {
                    search: query,
                },
            };
            inTreeApi.get('/stocksbystation/' + stationID, requestOptions).then(function (response) {
                fetchStationStocks({
                    stocks: response.data,
                });
            });
        }
    };

    const delayedQuery = useCallback(
        debounce((q: string) => sendQuery(q), 500),
        [],
    );

    const searchStocks = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTerm(e.target.value);
        delayedQuery(e.target.value);
    };

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
                        <Search handleSearch={searchStocks} />
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
    fetchStationStocks: PropTypes.any,
    station: PropTypes.any,
    stocks: PropTypes.any,
    addToast: PropTypes.any,
    getStocks: PropTypes.any,
    handleEdit: PropTypes.any,
};

const mapStateToProps = (state: AppState): StocksState => ({
    stocks: state.stocksRoot.stocks,
});

export default connect(mapStateToProps, { addToast, fetchStationStocks })(StocksList);
