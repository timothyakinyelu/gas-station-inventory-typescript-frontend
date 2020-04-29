/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getExpensesByStation: async function (stationID?: number, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/expensesbystation/' + stationID + '?page=' + currentPage);
    },
    getStationDayExpense: async function (stationID?: number, date?: string): Promise<any> {
        return await inTreeApi.get('/station-day-expense/' + stationID + '/' + date);
    },
    editDayExpense: async function (expenseID?: number): Promise<any> {
        return await inTreeApi.get('/expenses/' + expenseID + '/edit');
    },
    updateDayExpense: async function (
        expenseID?: number,
        amount?: any,
        reference?: any,
        expenseDate?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('amount', amount);
        fd.append('description', reference);
        fd.append('expense_date', expenseDate);

        fd.append('_method', 'PUT');

        return await inTreeApi.post('/expenses/' + expenseID + '/update', fd);
    },
    storeNewExpense: async function (stationID?: any, dateOfExpense?: any, items?: any): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('expense_date', dateOfExpense);
        fd.append('items', JSON.stringify(items));

        return await inTreeApi.post('/expenses/expense', fd);
    },
    getDayExpenses: async function (stationID?: string, dateOfExpense?: string): Promise<any> {
        return await inTreeApi.get('/expenses/expense/' + stationID + '/' + dateOfExpense);
    },
    deleteExpense: async function (expenseID?: any[]): Promise<any> {
        return await inTreeApi.delete('/expenses/' + expenseID);
    },
};
