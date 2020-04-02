/* eslint-disable @typescript-eslint/no-explicit-any */
import { CentralState, CentralActionTypes, FETCH_STATIONS } from './types';

const initialState: CentralState = {
    stations: [],
};

export function CentralReducer(state = initialState, actions: CentralActionTypes): any {
    switch (actions.type) {
        case FETCH_STATIONS:
            return {
                ...state.stations,
                stations: actions.payload,
            };
        default:
            return state;
    }
}
