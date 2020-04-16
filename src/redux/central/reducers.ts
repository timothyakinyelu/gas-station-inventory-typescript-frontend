/* eslint-disable @typescript-eslint/no-explicit-any */
import { CentralState, CentralActionTypes, FETCH_STATIONS, SET_STATION, SET_SIDEBAR } from './types';

const initialState: CentralState = {
    stations: [],
    station: {},
    sidebarToggle: true,
};

export function CentralReducer(state = initialState, actions: CentralActionTypes): any {
    switch (actions.type) {
        case FETCH_STATIONS:
            return {
                ...state,
                ...actions.payload,
            };
        case SET_STATION:
            return {
                ...state,
                station: actions.payload,
            };
        case SET_SIDEBAR:
            return {
                ...state,
                sidebarToggle: actions.payload,
            };
        default:
            return state;
    }
}
