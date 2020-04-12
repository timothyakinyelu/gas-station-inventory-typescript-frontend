import {
    SalesState,
    SalesActionTypes,
    FETCH_STATION_SALES,
    FETCH_SALES_DETAILS,
    FETCH_SALE_TO_EDIT,
    ADD_SALE,
    FETCH_DAY_SALES,
} from './types';

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

export function fetchDaySales(daySales: SalesState): SalesActionTypes {
    return {
        type: FETCH_DAY_SALES,
        payload: daySales,
    };
}

export function fetchSaleToEdit(editSale: SalesState): SalesActionTypes {
    return {
        type: FETCH_SALE_TO_EDIT,
        payload: editSale,
    };
}

export function addSale(sale: SalesState): SalesActionTypes {
    return {
        type: ADD_SALE,
        payload: sale,
    };
}
