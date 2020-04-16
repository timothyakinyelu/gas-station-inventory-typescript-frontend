import { CentralState, FETCH_STATIONS, CentralActionTypes, SET_STATION, Station, SET_SIDEBAR } from './types';

export function fetchStations(stations: CentralState): CentralActionTypes {
    return {
        type: FETCH_STATIONS,
        payload: stations,
    };
}

export function setStation(selectedStation: Station): CentralActionTypes {
    return {
        type: SET_STATION,
        payload: selectedStation,
    };
}

export function setSidebar(sidebarToggle: boolean): CentralActionTypes {
    return {
        type: SET_SIDEBAR,
        payload: sidebarToggle,
    };
}
