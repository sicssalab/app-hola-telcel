import initialState from "./initialState";
import types from "../constants/reducers/experienceProfileListConstants";

const experienceProfileListReducer = (state = initialState.experienceProfileList, action) => {
    switch(action.type) {
        case types.EXPERIENCES_PROFILELIST_FETCHING:
            return {...state, ...action.experienceProfileList};
        case types.EXPERIENCES_PROFILELIST:
            return {...state, ...action.experienceProfileList};
        case types.EXPERIENCES_PROFILELIST_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.experienceProfileList};
        default:
            return state;
    }
}
export default experienceProfileListReducer;