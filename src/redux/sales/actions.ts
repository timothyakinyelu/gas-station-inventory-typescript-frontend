import { SalesState, SalesActionTypes, FETCH_STATION_SALES, FETCH_SALES_DETAILS } from './types';

export function fetchStationSales(sales: SalesState): SalesActionTypes {
    return {
        type: FETCH_STATION_SALES,
        payload: sales,
    };
}

export function fetchSalesDetails(salesDetail: SalesState): SalesActionTypes {
    return {
        type: FETCH_SALES_DETAILS,
        payload: salesDetail,
    };
}
