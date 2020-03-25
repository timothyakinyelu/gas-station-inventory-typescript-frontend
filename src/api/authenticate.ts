/* eslint-disable @typescript-eslint/no-explicit-any */
//Handle Login and Logout from api in this file.

import { inTreeApi } from '../config';

export default {
    Login: async function (email: string, password: string): Promise<any> {
        const FD = new FormData();

        FD.append('email', email);
        FD.append('password', password);

        return await inTreeApi.post('/login', FD);
    },
    getUser: async function (): Promise<any> {
        return await inTreeApi.get('/me');
    },
};
