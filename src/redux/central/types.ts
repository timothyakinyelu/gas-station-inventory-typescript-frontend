export interface Station {
    id?: number;
    name?: string;
    slug?: string;
    isClicked?: boolean;
}

export interface CentralState {
    stations?: Station[];
    station?: Station;
    sidebarToggle?: boolean;
}

export const FETCH_STATIONS = 'FETCH_STATIONS';
export const SET_STATION = 'SET_STATION';
export const SET_SIDEBAR = 'SET_SIDEBAR';

export interface FetchStationsAction {
    type: typeof FETCH_STATIONS;
    payload: CentralState;
}

export interface SetStationAction {
    type: typeof SET_STATION;
    payload: Station;
}

export interface SetSidebarAction {
    type: typeof SET_SIDEBAR;
    payload: boolean;
}

export type CentralActionTypes = FetchStationsAction | SetStationAction | SetSidebarAction;
