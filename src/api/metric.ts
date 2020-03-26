/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByCurrentMonth: async function (): Promise<any> {
        return await inTreeApi.get('/sum-currentmonth');
    },
    getExpensesByCurrentMonth: async function (): Promise<any> {
        return await inTreeApi.get('/sum-currentmonth-expenses');
    },
    getDataByMonth: async function (): Promise<any> {
        return await inTreeApi.get('/chartDataBymonth');
    },
};
