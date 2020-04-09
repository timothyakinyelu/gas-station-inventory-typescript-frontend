/* eslint-disable @typescript-eslint/no-explicit-any */
/*
|   fetches all station stocks.
|   stores and edits daily station stocks.
*/

import { inTreeApi } from '../config';

export default {
    getStocksByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/stocksbystation/' + stationID + '?page=' + currentPage);
    },
    editStock: async function (stockID?: number): Promise<any> {
        return await inTreeApi.get('/stocks/' + stockID + '/edit');
    },
    updateStock: async function (
        stockID?: number,
        productID?: any,
        tankCode?: any,
        openStock?: any,
        closeStock?: any,
        sold?: any,
        received?: any,
        stockDate?: any,
    ): Promise<any> {
        const fd = new FormData();

        // fd.append('id', employeeID);
        fd.append('product_id', productID);
        fd.append('tank_code', tankCode);
        fd.append('open_stock', openStock);
        fd.append('close_stock', closeStock);
        fd.append('inventory_sold', sold);
        fd.append('inventory_received', received);
        fd.append('date_of_inventory', stockDate);

        fd.append('_method', 'PUT');

        return await inTreeApi.post('/stocks/' + stockID + '/update', fd);
    },
    storeNewWetStock: async function (
        stationID?: any,
        codeID?: any,
        productID?: any,
        dateOfInventory?: any,
        items?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('product_id', productID);
        fd.append('date_of_inventory', dateOfInventory);
        fd.append('items', JSON.stringify(items));

        return await inTreeApi.post('/stocks/stock/wet', fd);
    },
    storeNewDryStock: async function (stationID?: any, codeID?: any, dateOfInventory?: any, items?: any): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('date_of_inventory', dateOfInventory);
        fd.append('items', JSON.stringify(items));

        return await inTreeApi.post('/stocks/stock/dry', fd);
    },
    getDayStocksByProductID: async function (
        stationID?: number,
        productID?: number,
        dateOfInventory?: string,
    ): Promise<any> {
        return await inTreeApi.get('/stocks/stock/wet/' + stationID + '/' + productID + '/' + dateOfInventory);
    },
    getDayStocksByProductCodeID: async function (
        stationID?: number,
        productCodeID?: number,
        dateOfInventory?: string,
    ): Promise<any> {
        return await inTreeApi.get('/stocks/stock/dry/' + stationID + '/' + productCodeID + '/' + dateOfInventory);
    },
    deleteStock: async function (stockID?: any[]): Promise<any> {
        return await inTreeApi.delete('/stocks/' + stockID);
    },
};
