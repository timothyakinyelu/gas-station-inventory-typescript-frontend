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
}

export const FETCH_STATION_SUPPLIES = 'FETCH_STATION_SUPPLIES';
export const FETCH_SUPPLY_TO_EDIT = 'FETCH_SUPPLY_TO_EDIT';

export interface FetchSuppliesAction {
    type: typeof FETCH_STATION_SUPPLIES;
    payload: SuppliesState;
}

export interface EditSupplyAction {
    type: typeof FETCH_SUPPLY_TO_EDIT;
    payload: SuppliesState;
}

export type SuppliesActionTypes = FetchSuppliesAction | EditSupplyAction;
