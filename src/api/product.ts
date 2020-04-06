/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getProducts: async function (currentPage?: string): Promise<any> {
        return await inTreeApi.get('/products?page=' + currentPage);
    },
};
