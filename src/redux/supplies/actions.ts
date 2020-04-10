import { SuppliesState, SuppliesActionTypes, FETCH_STATION_SUPPLIES, FETCH_SUPPLY_TO_EDIT } from './types';

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
