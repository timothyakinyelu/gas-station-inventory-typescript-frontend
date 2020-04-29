import {
    SuppliesState,
    SuppliesActionTypes,
    FETCH_STATION_SUPPLIES,
    FETCH_SUPPLY_TO_EDIT,
    FETCH_DAY_SUPPLIES,
    ADD_SUPPLY,
} from './types';

export function fetchStationSupplies(supplies: SuppliesState): SuppliesActionTypes {
    return {
        type: FETCH_STATION_SUPPLIES,
        payload: supplies,
    };
}

export function fetchSupplyToEdit(editSupply: SuppliesState): SuppliesActionTypes {
    return {
        type: FETCH_SUPPLY_TO_EDIT,
        payload: editSupply,
    };
}

export function fetchDaySupplies(daySupplies: SuppliesState): SuppliesActionTypes {
    return {
        type: FETCH_DAY_SUPPLIES,
        payload: daySupplies,
    };
}

export function addStock(supply: SuppliesState): SuppliesActionTypes {
    return {
        type: ADD_SUPPLY,
        payload: supply,
    };
}
