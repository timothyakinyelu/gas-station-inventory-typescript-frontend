import { ProductsState, ProductActionTypes, FETCH_PRODUCTS, FETCH_PRODUCT_TO_EDIT } from './types';

export function fetchProducts(products: ProductsState): ProductActionTypes {
    return {
        type: FETCH_PRODUCTS,
        payload: products,
    };
}

export function fetchProductToEdit(editProduct: ProductsState): ProductActionTypes {
    return {
        type: FETCH_PRODUCT_TO_EDIT,
        payload: editProduct,
    };
}
