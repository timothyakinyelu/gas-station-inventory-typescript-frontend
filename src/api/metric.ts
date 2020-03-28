/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByCurrentMonth: async function (): Promise<any> {
        return await inTreeApi.get('/currentMonthSalesSum');
    },
    getExpensesByCurrentMonth: async function (): Promise<any> {
        return await inTreeApi.get('/currentMonthExpensesSum');
    },
    getDataByMonth: async function (): Promise<any> {
        return await inTreeApi.get('/chartDataBymonth');
    },
};
