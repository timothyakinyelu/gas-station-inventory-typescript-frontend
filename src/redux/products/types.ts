export interface Product {
    id?: number;
    product_code?: number;
    product?: string;
    price?: number;
    date?: Date;
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
}

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT_TO_EDIT = 'FETCH_PRODUCT_TO_EDIT';

export interface FetchProductsAction {
    type: typeof FETCH_PRODUCTS;
    payload: ProductsState;
}

export interface EditProductAction {
    type: typeof FETCH_PRODUCT_TO_EDIT;
    payload: ProductsState;
}

export type ProductActionTypes = FetchProductsAction | EditProductAction;
