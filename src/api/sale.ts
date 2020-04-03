/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByStation: async function (stationID?: number): Promise<any> {
        return await inTreeApi.get('/salesbystation/' + stationID);
    },
};
