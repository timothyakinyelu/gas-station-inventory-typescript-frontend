import { SalesState, SalesActionTypes, FETCH_STATION_SALES } from './types';

export function fetchStationSales(sales: SalesState): SalesActionTypes {
    return {
        type: FETCH_STATION_SALES,
        payload: sales,
    };
}
