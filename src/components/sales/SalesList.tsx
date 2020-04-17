/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback, useState } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { SalesState, Sales } from '../../redux/sales/types';
import { connect } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import sale from '../../api/sale';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Search from '../../reusables/partials/Search';
import { inTreeApi } from '../../config';
import { debounce } from 'lodash';
import { fetchStationSales } from '../../redux/sales/actions';

interface SalesListProps {
    fetchStationSales: typeof fetchStationSales;
    station?: Station;
    sales?: Sales;
}
const SalesList: React.FC<SalesListProps> = ({ station, sales, fetchStationSales }): JSX.Element => {
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = sales;

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
            sale.getSalesByStation(Number(stationID), pageNumber).then((res) => {
                fetchStationSales({
                    sales: res.data,
                });
            });

            history.push(
                '/' + companyID + '/' + company + '/sales/' + stationID + '/' + stationName + '?page=' + pageNumber,
            );
        },
        [history, companyID, company, stationID, stationName],
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
            inTreeApi.get('/salesbystation/' + stationID, requestOptions).then(function (response) {
                fetchStationSales({
                    sales: response.data,
                });
            });
        }
    };

    const delayedQuery = useCallback(
        debounce((q: string) => sendQuery(q), 500),
        [],
    );

    const searchSales = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

    const showDaySales = (date: any, id?: number, code?: string): void => {
        history.push(
            '/' +
                companyID +
                '/' +
                company +
                '/sales/' +
                stationID +
                '/' +
                stationName +
                '/' +
                id +
                '/' +
                code +
                '/' +
                date,
        );
    };

    return (
        <div className="list-table">
            {name && (
                <>
                    <h5 title={name} className="sales-table-header">
                        {name} Sales Table
                    </h5>
                    <div className="list-table-inner">
                        <Search handleSearch={searchSales} />
                        {items?.data === undefined || items?.data.length < 0 ? (
                            <h5>No Records Available!</h5>
                        ) : (
                            <DataTable items={items} name={name} changePage={changePage} getDetails={showDaySales} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

SalesList.propTypes = {
    fetchStationSales: PropTypes.any,
    station: PropTypes.any,
    sales: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    sales: state.salesRoot.sales,
});

export default connect(mapStateToProps, { fetchStationSales })(SalesList);
