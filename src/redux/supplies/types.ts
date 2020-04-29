export interface Supply {
    id?: number;
    product_id?: number;
    inventory_received?: number;
    supply_price?: number;
    date_of_supply?: string;
}

export interface Supplies {
    allChecked?: boolean;
    checkboxes?: Supply[];
    current_page?: number;
    last_page?: number;
    to?: number;
    total?: number;
    message?: string;
    data?: Supply[];
}

export interface SuppliesState {
    supplies?: Supplies;
    editSupply?: Supply;
    supply?: Supply;
    daySupplies?: Supplies;
}

export const FETCH_STATION_SUPPLIES = 'FETCH_STATION_SUPPLIES';
export const FETCH_SUPPLY_TO_EDIT = 'FETCH_SUPPLY_TO_EDIT';
export const FETCH_DAY_SUPPLIES = 'FETCH_DAY_SUPPLIES';
export const ADD_SUPPLY = 'ADD_SUPPLY';

export interface FetchSuppliesAction {
    type: typeof FETCH_STATION_SUPPLIES;
    payload: SuppliesState;
}

export interface EditSupplyAction {
    type: typeof FETCH_SUPPLY_TO_EDIT;
    payload: SuppliesState;
}

export interface DaySuppliesAction {
    type: typeof FETCH_DAY_SUPPLIES;
    payload: SuppliesState;
}

export interface AddSupplyAction {
    type: typeof ADD_SUPPLY;
    payload: SuppliesState;
}

export type SuppliesActionTypes = FetchSuppliesAction | EditSupplyAction | DaySuppliesAction | AddSupplyAction;
