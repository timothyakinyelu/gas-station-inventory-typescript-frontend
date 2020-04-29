/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getSalesByCurrentMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/currentMonthSalesSum/' + companyID);
    },
    getExpensesByCurrentMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/currentMonthExpensesSum/' + companyID);
    },
    getStationExpensesByDate: async function (companyID?: string, from?: string, to?: string): Promise<any> {
        // console.log(range);
        return await inTreeApi.get('/selectedMonthExpensesSum/' + companyID + '/' + from + '/' + to);
    },
    getStationSalesByDate: async function (companyID?: string, from?: string, to?: string): Promise<any> {
        // console.log(range);
        return await inTreeApi.get('/selectedMonthSalesSum/' + companyID + '/' + from + '/' + to);
    },
    getDataByMonth: async function (companyID?: string): Promise<any> {
        return await inTreeApi.get('/chartDataBymonth/' + companyID);
    },
};
