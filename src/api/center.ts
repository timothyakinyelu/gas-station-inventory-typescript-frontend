/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getStations: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/stations/' + companyID);
    },
};
