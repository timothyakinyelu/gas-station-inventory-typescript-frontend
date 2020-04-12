import {
    ProductsState,
    ProductActionTypes,
    FETCH_PRODUCTS,
    FETCH_PRODUCT_TO_EDIT,
    FETCH_PRODUCT_CODES,
    SET_PRODUCT_CODE,
    ProductCode,
} from './types';

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

export function fetchProductCodes(productCodes: ProductsState): ProductActionTypes {
    return {
        type: FETCH_PRODUCT_CODES,
        payload: productCodes,
    };
}

export function setProductCode(productCode: ProductCode): ProductActionTypes {
    return {
        type: SET_PRODUCT_CODE,
        payload: productCode,
    };
}
