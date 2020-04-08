/* eslint-disable @typescript-eslint/no-explicit-any */
import { inTreeApi } from '../config';

export default {
    getProductTypes: async function (): Promise<any> {
        return await inTreeApi.get('/product-types');
    },
    getProductCodes: async function (): Promise<any> {
        return await inTreeApi.get('/product-codes');
    },
    getProducts: async function (companyID?: string, currentPage?: number): Promise<any> {
        return await inTreeApi.get('/products/' + companyID + '?page=' + currentPage);
    },
    storeProduct: async function (type?: any, code?: any, name?: any, price?: any): Promise<any> {
        const fd = new FormData();

        fd.append('product_type_id', type);
        fd.append('product_code_id', code);
        fd.append('name', name);
        fd.append('price', price);

        return await inTreeApi.post('/products', fd);
    },
    editProduct: async function (productID?: number): Promise<any> {
        return await inTreeApi.get('/products/' + productID + '/edit');
    },
    updateProduct: async function (productID?: any, productCodeId?: any, name?: any, price?: any): Promise<any> {
        const fd = new FormData();

        fd.append('product_code_id', productCodeId);
        fd.append('name', name);
        fd.append('price', price);

        fd.append('_method', 'PUT');

        return await inTreeApi.post('/products/' + productID + '/update', fd);
    },
    deleteProduct: async function (productID?: any[]): Promise<any> {
        return await inTreeApi.delete('/products/' + productID);
    },
};
