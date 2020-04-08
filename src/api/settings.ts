/* eslint-disable @typescript-eslint/no-explicit-any */
/*
|   Reset password settings
*/

import { inTreeApi } from '../config';

export default {
    sendEmailLink: function (email?: string): Promise<any> {
        return inTreeApi.post('/settings/sendPasswordResetLink', {
            email: email,
        });
    },
    passwordChange: function (token?: any, email?: any, password?: any, passwordConfirmation?: any): Promise<any> {
        const fd = new FormData();

        fd.append('token', token);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('password_confirmation', passwordConfirmation);

        return inTreeApi.post('/settings/resetPassword', fd);
    },
};
