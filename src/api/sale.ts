/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/salesbystation/' + stationID + '?page=' + currentPage);
    },
    getSalesByDate: async function (stationID?: number, id?: number, date?: string): Promise<any> {
        return await inTreeApi.get('/salesbydate/' + stationID + '/' + id + '/' + date);
    },
    storeNewWetSale: async function (
        stationID?: any,
        codeID?: any,
        productID?: any,
        unitPrice?: any,
        dateOfSale?: any,
        foreCourts?: any[],
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('product_id', productID);
        fd.append('unit_price', unitPrice);
        fd.append('date_of_entry', dateOfSale);
        fd.append('foreCourts', JSON.stringify(foreCourts));

        return await inTreeApi.post('/sales/sale/wet', fd);
    },
    storeNewDrySale: async function (
        stationID?: any,
        codeID?: any,
        dateOfSale?: any,
        foreCourts?: any[],
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('product_code_id', codeID);
        fd.append('date_of_entry', dateOfSale);
        fd.append('foreCourts', JSON.stringify(foreCourts));

        return await inTreeApi.post('/sales/sale/dry', fd);
    },
    getDaySalesByProductID: async function (stationID?: string, productID?: number, dateOfSale?: string): Promise<any> {
        return await inTreeApi.get('/sales/sale/wet/' + stationID + '/' + productID + '/' + dateOfSale);
    },
    getDaySalesByProductCodeID: async function (
        stationID?: string,
        productCodeID?: string,
        dateOfSale?: string,
    ): Promise<any> {
        return await inTreeApi.get('/sales/sale/dry/' + stationID + '/' + productCodeID + '/' + dateOfSale);
    },
    editDaySale: async function (saleID?: number): Promise<any> {
        return await inTreeApi.get('/sales/' + saleID + '/edit');
    },
    updateDaySale: async function (
        saleID?: any,
        productID?: any,
        unitPrice?: any,
        pumpCode?: any,
        startMetre?: any,
        endMetre?: any,
        qtySold?: any,
        amount?: any,
        dateOfSale?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('product_id', productID);
        fd.append('unit_price', unitPrice);
        fd.append('pump_code', pumpCode);
        fd.append('start_metre', startMetre);
        fd.append('end_metre', endMetre);
        fd.append('quantity_sold', qtySold);
        fd.append('amount', amount);
        fd.append('date_of_entry', dateOfSale);

        fd.append('_method', 'PUT');

        return await inTreeApi.post('/sales/' + saleID + '/update', fd);
    },
    deleteSale: async function (saleID?: any[]): Promise<any> {
        return await inTreeApi.delete('/sales/' + saleID);
    },
};
