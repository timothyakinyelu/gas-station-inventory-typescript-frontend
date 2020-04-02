import { CentralState, FETCH_STATIONS, CentralActionTypes } from './types';

export function fetchStations(stations: CentralState): CentralActionTypes {
    return {
        type: FETCH_STATIONS,
        payload: stations,
    };
}
