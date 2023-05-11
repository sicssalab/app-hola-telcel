import initialState from "./initialState";
import types from "../constants/reducers/experiencesConstants";

const experiencesReducer = (state = initialState.experiences, action) => {
    switch(action.type) {
        case types.EXPERIENCES_FETCHING:
            return {...state, ...action.experiences};
        case types.EXPERIENCES:
            return {...state, ...action.experiences};
        case types.EXPERIENCES_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.experiences};
        default:
            return state;
    }
}
export default experiencesReducer;