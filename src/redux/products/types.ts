export interface Product {
    id?: number;
    name?: string;
    product_code?: number;
    product_code_id?: number;
    product?: string;
    price?: number;
    date?: Date;
}

export interface ProductCode {
    id?: number;
    code?: string;
}

export interface Products {
    allChecked?: boolean;
    checkboxes?: Product[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Product[];
}

export interface ProductsState {
    products?: Products;
    editProduct?: Product;
    productCodes?: ProductCode[];
    productCode?: ProductCode;
}

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT_TO_EDIT = 'FETCH_PRODUCT_TO_EDIT';
export const FETCH_PRODUCT_CODES = 'FETCH_PRODUCT_CODES';
export const SET_PRODUCT_CODE = 'SET_PRODUCT_CODE';

export interface FetchProductsAction {
    type: typeof FETCH_PRODUCTS;
    payload: ProductsState;
}

export interface EditProductAction {
    type: typeof FETCH_PRODUCT_TO_EDIT;
    payload: ProductsState;
}

export interface FetchProductCodesAction {
    type: typeof FETCH_PRODUCT_CODES;
    payload: ProductsState;
}

export interface SetProductCodeAction {
    type: typeof SET_PRODUCT_CODE;
    payload: ProductCode;
}

export type ProductActionTypes =
    | FetchProductsAction
    | EditProductAction
    | FetchProductCodesAction
    | SetProductCodeAction;
