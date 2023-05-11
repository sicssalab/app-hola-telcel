import initialState from "./initialState";
import types from "../constants/reducers/statesListConstants";

const statesListReducer = (state = initialState.statesList, action) => {
    switch(action.type) {
        case types.STATESLIST_FETCHING:
            return {...state, ...action.statesList};
        case types.STATESLIST:
            return {...state, ...action.statesList};
        case types.STATESLIST_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.statesList};
        default:
            return state;
    }
}
export default statesListReducer;