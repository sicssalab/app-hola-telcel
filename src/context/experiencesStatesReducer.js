import initialState from "./initialState";
import types from "../constants/reducers/experiencesStatesConstants";

const experiencesStatesReducer = (state = initialState.experiencesStates, action) => {
    switch(action.type) {
        case types.EXPERIENCES_STATES_FETCHING:
            return {...state, ...action.experiencesStates};
        case types.EXPERIENCES_STATES:
            return {...state, ...action.experiencesStates};
        case types.EXPERIENCES_STATES_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.experiencesStates};
        default:
            return state;
    }
}
export default experiencesStatesReducer;