/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/salesbystation/' + stationID + '?page=' + currentPage);
    },
};
