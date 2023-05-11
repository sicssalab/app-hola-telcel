import initialState from "./initialState";
import types from "../constants/reducers/avenueProfileListConstants";

const avenueProfileListReducer = (state = initialState.avenueProfileList, action) => {
    switch(action.type) {
        case types.AVENUE_PROFILELIST_FETCHING:
            return {...state, ...action.avenueProfileList};
        case types.AVENUE_PROFILELIST:
            return {...state, ...action.avenueProfileList};
        case types.AVENUE_PROFILELIST_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.avenueProfileList};
        default:
            return state;
    }
}
export default avenueProfileListReducer;