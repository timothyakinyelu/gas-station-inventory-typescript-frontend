/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react';
import { Station } from '../../redux/central/types';
import PropTypes from 'prop-types';
import { AppState } from '../../redux';
import { SalesState, Sales, FETCH_STATION_SALES } from '../../redux/sales/types';
import { connect, useDispatch } from 'react-redux';
import DataTable from '../../reusables/partials/DataTable';
import sale from '../../api/sale';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { fetchStationSales } from '../../redux/sales/actions';

interface SalesListProps {
    station?: Station;
    sales?: Sales;
    fetchStationSales: typeof fetchStationSales;
}
const SalesList: React.FC<SalesListProps> = ({ station, sales }): JSX.Element => {
    const str = station?.slug;

    const name = str?.replace(/-/, ' ').toLocaleUpperCase();
    const items = sales;

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
            sale.getSalesByStation(Number(stationID), pageNumber)
                .then((res) => {
                    dispatch({
                        type: FETCH_STATION_SALES,
                        payload: {
                            sales: res.data,
                        },
                    });
                    console.log(res);
                })
                .catch((e) => {
                    console.error(e);
                });

            history.push(
                '/' + companyID + '/' + company + '/sales/' + stationID + '/' + stationName + '?page=' + pageNumber,
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
    }, [sales, page, changePage, fetchData]);

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
                        {items?.data !== [] ? (
                            <DataTable items={items} name={name} changePage={changePage} getDetails={showDaySales} />
                        ) : (
                            <h5>No Records Available!</h5>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

SalesList.propTypes = {
    station: PropTypes.any,
    sales: PropTypes.any,
    fetchStationSales: PropTypes.any,
};

const mapStateToProps = (state: AppState): SalesState => ({
    sales: state.salesRoot.sales,
});

export default connect(mapStateToProps, { fetchStationSales })(SalesList);
