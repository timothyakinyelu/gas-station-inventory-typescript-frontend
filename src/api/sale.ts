/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/salesbystation/' + stationID + '?page=' + currentPage);
    },
    getSalesByDate: async function (stationID?: number, id?: number, date?: string): Promise<any> {
        return await inTreeApi.get('/salesbydate/' + stationID + '/' + id + '/' + date);
    },
    deleteSale: async function (saleID?: any[]): Promise<any> {
        return await inTreeApi.delete('/sales/' + saleID);
    },
};
