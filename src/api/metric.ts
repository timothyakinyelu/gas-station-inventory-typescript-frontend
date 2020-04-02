/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByCurrentMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/currentMonthSalesSum/' + companyID);
    },
    getExpensesByCurrentMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/currentMonthExpensesSum/' + companyID);
    },
    getDataByMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/chartDataBymonth/' + companyID);
    },
};
