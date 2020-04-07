/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getProducts: async function (currentPage?: number): Promise<any> {
        return await inTreeApi.get('/products?page=' + currentPage);
    },
    editProduct: async function (productID?: number): Promise<any> {
        return await inTreeApi.get('/products/' + productID + '/edit');
    },
    deleteProduct: async function (productID?: any[]): Promise<any> {
        return await inTreeApi.delete('/products/' + productID);
    },
};
