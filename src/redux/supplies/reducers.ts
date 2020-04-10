import { SuppliesState, SuppliesActionTypes, FETCH_STATION_SUPPLIES, FETCH_SUPPLY_TO_EDIT } from './types';

const initialState: SuppliesState = {
    supplies: {},
    editSupply: {},
};

export function SuppliesReducer(state = initialState, actions: SuppliesActionTypes): SuppliesState {
    switch (actions.type) {
        case FETCH_STATION_SUPPLIES:
            return {
                ...state,
                ...actions.payload,
            };
        case FETCH_SUPPLY_TO_EDIT:
            return {
                ...state,
                ...actions.payload,
            };
        default:
            return state;
    }
}
