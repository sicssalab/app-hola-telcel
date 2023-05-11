import initialState from "./initialState";
import types from "../constants/reducers/entertainmentsProfileListConstants";

const entertainmentProfileListReducer = (state = initialState.entertainmentProfileList, action) => {
    switch(action.type) {
        case types.ENTERTAINMENTS_PROFILELIST_FETCHING:
            return {...state, ...action.entertainmentProfileList};
        case types.ENTERTAINMENTS_PROFILELIST:
            return {...state, ...action.entertainmentProfileList};
        case types.ENTERTAINMENTS_PROFILELIST_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.entertainmentProfileList};
        default:
            return state;
    }
}
export default entertainmentProfileListReducer;