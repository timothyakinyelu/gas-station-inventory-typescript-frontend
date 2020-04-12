import {
    ProductsState,
    ProductActionTypes,
    FETCH_PRODUCTS,
    FETCH_PRODUCT_TO_EDIT,
    FETCH_PRODUCT_CODES,
    SET_PRODUCT_CODE,
} from './types';

const initialState: ProductsState = {
    products: {},
    editProduct: {},
    productCodes: [],
    productCode: {},
};

export function ProductsReducer(state = initialState, actions: ProductActionTypes): ProductsState {
    switch (actions.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_PRODUCT_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_PRODUCT_CODES:
            return {
                ...state,
                ...actions.payload,
            };
        case SET_PRODUCT_CODE:
            return {
                ...state,
                productCode: actions.payload,
            };
        default:
            return state;
    }
}
