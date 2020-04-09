/* eslint-disable @typescript-eslint/no-explicit-any */

import { inTreeApi } from '../config';

export default {
    getEmployees: async function (companyID?: string, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/employees/' + companyID + '?page=' + currentPage);
    },
    editEmployee: async function (employeeID?: number): Promise<any> {
        return await inTreeApi.get('/employees/' + employeeID + '/edit');
    },
    storeEmployee: async function (
        stationID?: any,
        firstName?: any,
        secondName?: any,
        lastName?: any,
        phoneNumber?: any,
        address?: any,
        dateOfBirth?: any,
        employeeRole?: any,
        salary?: any,
        dateOfHire?: any,
        avatar?: any,
        companyID?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('firstName', firstName);
        fd.append('secondName', secondName);
        fd.append('lastName', lastName);
        fd.append('phone', phoneNumber);
        fd.append('address', address);
        fd.append('date_of_birth', dateOfBirth);
        fd.append('role', employeeRole);
        fd.append('salary', salary);
        fd.append('date_hired', dateOfHire);
        fd.append('avatar', avatar);
        fd.append('company_id', companyID);

        return await inTreeApi.post('/employees', fd);
    },
    updateEmployee: async function (
        employeeID?: number,
        stationID?: any,
        firstName?: any,
        secondName?: any,
        lastName?: any,
        phoneNumber?: any,
        address?: any,
        dateOfBirth?: any,
        employeeRole?: any,
        salary?: any,
        dateOfHire?: any,
        avatar?: any,
    ): Promise<any> {
        const fd = new FormData();

        fd.append('station_id', stationID);
        fd.append('firstName', firstName);
        fd.append('secondName', secondName);
        fd.append('lastName', lastName);
        fd.append('phone', phoneNumber);
        fd.append('address', address);
        fd.append('date_of_birth', dateOfBirth);
        fd.append('role', employeeRole);
        fd.append('salary', salary);
        fd.append('date_hired', dateOfHire);
        fd.append('avatar', avatar);
        fd.append('_method', 'PUT');

        return await inTreeApi.post('/employees/' + employeeID + '/update', fd);
    },
    deleteEmployee: async function (employeeID?: any[]): Promise<any> {
        return await inTreeApi.delete('/employees/' + employeeID + '/delete');
    },
};
