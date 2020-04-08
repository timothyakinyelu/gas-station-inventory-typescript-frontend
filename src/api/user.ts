/* eslint-disable @typescript-eslint/no-explicit-any */

import { inTreeApi } from '../config';

export default {
    getUsers: async function (companyID?: string, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/users/' + companyID + '?page=' + currentPage);
    },
    editUser: async function (userID?: number): Promise<any> {
        return await inTreeApi.get('/users/' + userID + '/edit');
    },
    storeUser: async function (
        stationID?: any,
        employeeID?: any,
        employeeEmail?: any,
        permission?: any,
        companyID?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('employee_id', employeeID);
        fd.append('email', employeeEmail);
        fd.append('permission', permission);
        fd.append('company_id', companyID);

        return await inTreeApi.post('/users', fd);
    },
    updateUser: async function (userID?: number, permission?: any): Promise<any> {
        const fd = new FormData();

        fd.append('permission', permission);
        fd.append('_method', 'PUT');

        return await inTreeApi.post('/users/' + userID + '/update', fd);
    },
    deleteUser: async function (userID?: any[]): Promise<any> {
        return await inTreeApi.delete('/users/' + userID);
    },
};
