import { ProductsState, ProductActionTypes, FETCH_PRODUCTS, FETCH_PRODUCT_TO_EDIT } from './types';

const initialState: ProductsState = {
    products: {},
    editProduct: {},
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
        default:
            return state;
    }
}
