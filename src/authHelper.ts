/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from 'js-cookie';

const url = 'https://api.inventreed.com/api/v2';
export default {
    handle(TOKEN: string): void {
        this.set(TOKEN);
    },

    set(TOKEN: string): void {
        cookie.set('token', TOKEN);
    },

    get(): any {
        // console.log('token')
        return cookie.get('token');
    },

    remove(): null {
        cookie.remove('token');
        return null;
    },

    isValid(): boolean {
        const TOKEN = this.get();
        const iss = {
            login: url + '/login',
        };
        if (TOKEN) {
            const payload = this.tokenPayload(TOKEN);
            if (payload) {
                return Object.values(iss).indexOf(payload.iss) > -1 ? true : false;
            }
        }
        return false;
    },

    tokenPayload(TOKEN: string): any {
        return this.decode(TOKEN);
    },

    decode(TOKEN: string): unknown {
        // const TOKEN = this.get();
        const payloadInfo = TOKEN.split('.')[1];
        return JSON.parse(atob(payloadInfo));
    },

    loggedIn(): boolean {
        return this.isValid();
    },

    // getTokenExiprationDate(): Date | null {
    //     const currentUser = this.get();
    //     const decoded = this.tokenPayload(currentUser);

    //     if (decoded['exp'] === undefined) return null;
    //     const date = new Date(0);
    //     date.setUTCSeconds(decoded['exp']);
    //     return date;
    // },

    // isChecked(currentUser: string | undefined): boolean {
    //     if (!currentUser) currentUser = this.get();
    //     if (!currentUser) return true;

    //     const date = this.getTokenExiprationDate();
    //     if (date === undefined) return false;
    //     return !(date.valueOf() > new Date().valueOf());
    // },
};
