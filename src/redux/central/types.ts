export interface Station {
    id: number;
    name: string;
    slug: string;
}

export interface CentralState {
    stations: Station[];
}

export const FETCH_STATIONS = 'FETCH_STATIONS';

export interface FetchStationsAction {
    type: typeof FETCH_STATIONS;
    payload: CentralState;
}

export type CentralActionTypes = FetchStationsAction;
