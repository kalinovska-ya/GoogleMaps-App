import { StationType } from "../../types";

const SET_STATIONS = 'SET_STATIONS';

let initialState = {
    stations: [] as Array<StationType>,
}

type InitialStateType = typeof initialState;

type ActionType = ReturnType<typeof setStationsAC>;

const mapReduser = (state = initialState, action:ActionType):InitialStateType => {
    switch(action.type) {
        case SET_STATIONS: {
            return {...state, stations: action.stations}
        }
        default: 
            return state;
    }
}

export const setStationsAC = (stations:Array<StationType>) => ({ type: SET_STATIONS, stations } as const)

export default mapReduser;

export type InitialState = typeof initialState;