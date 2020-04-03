export interface Station {
    id?: number;
    name?: string;
    slug?: string;
}

export interface CentralState {
    isClicked?: boolean;
    stations?: Station[];
    station?: Station;
}

export const FETCH_STATIONS = 'FETCH_STATIONS';
export const SET_STATION = 'SET_STATION';

export interface FetchStationsAction {
    type: typeof FETCH_STATIONS;
    payload: CentralState;
}

export interface SetStationAction {
    type: typeof SET_STATION;
    payload: Station;
}

export type CentralActionTypes = FetchStationsAction | SetStationAction;
