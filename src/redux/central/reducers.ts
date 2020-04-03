/* eslint-disable @typescript-eslint/no-explicit-any */
import { CentralState, CentralActionTypes, FETCH_STATIONS, SET_STATION } from './types';

const initialState: CentralState = {
    stations: [],
    station: {},
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
        default:
            return state;
    }
}
