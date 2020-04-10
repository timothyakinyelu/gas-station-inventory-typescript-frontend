/* eslint-disable @typescript-eslint/no-explicit-any */
/*
|   fetches all station supplies.
|   stores and edits daily station supplies.
*/

import { inTreeApi } from '../config';

export default {
    getSuppliesByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/suppliesbystation/' + stationID + '?page=' + currentPage);
    },
    editSupply: async function (supplyID?: number): Promise<any> {
        return await inTreeApi.get('/supplies/' + supplyID + '/edit');
    },
    updateSupply: async function (
        supplyID?: number,
        productID?: any,
        received?: any,
        supplyPrice?: any,
        supplyDate?: any,
    ): Promise<any> {
        const fd = new FormData();

        // fd.append('id', employeeID);
        fd.append('product_id', productID);
        fd.append('inventory_received', received);
        fd.append('supply_price', supplyPrice);
        fd.append('date_of_supply', supplyDate);

        fd.append('_method', 'PUT');

        return await inTreeApi.post('/supplies/' + supplyID + '/update', fd);
    },
    storeNewWetSupply: async function (
        stationID?: any,
        codeID?: any,
        productID?: any,
        supplyPrice?: any,
        dateOfSupply?: any,
        items?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('product_id', productID);
        fd.append('date_of_supply', dateOfSupply);
        fd.append('supply_price', supplyPrice);
        fd.append('items', JSON.stringify(items));

        return await inTreeApi.post('/supplies/supply/wet', fd);
    },
    storeNewDrySupply: async function (stationID?: any, codeID?: any, dateOfSupply?: any, items?: any): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('date_of_supply', dateOfSupply);
        fd.append('items', JSON.stringify(items));

        return await inTreeApi.post('/supplies/supply/dry', fd);
    },
    getDaySuppliesByProductID: async function (
        stationID?: number,
        productID?: number,
        dateOfSupply?: string,
    ): Promise<any> {
        return await inTreeApi.get('/supplies/supply/wet/' + stationID + '/' + productID + '/' + dateOfSupply);
    },
    getDaySuppliesByProductCodeID: async function (
        stationID?: number,
        productCodeID?: number,
        dateOfSupply?: string,
    ): Promise<any> {
        return await inTreeApi.get('/supplies/supply/dry/' + stationID + '/' + productCodeID + '/' + dateOfSupply);
    },
    deleteSupply: async function (supplyID?: any[]): Promise<any> {
        return await inTreeApi.delete('/supplies/' + supplyID);
    },
};
