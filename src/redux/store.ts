import { combineReducers, createStore } from "redux";
import mapReduser from "./reducers/map-reduser";

let rootReducer = combineReducers({
    map: mapReduser,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer);

// @ts-ignore
window.store = store;

export default store;