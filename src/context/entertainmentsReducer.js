import initialState from "./initialState";
import types from "../constants/reducers/entertainmentsConstants";

const entertainmentsReducer = (state = initialState.entertainments, action) => {
    switch(action.type) {
        case types.ENTERTAINMENTS_FETCHING:
            return {...state, ...action.entertainments};
        case types.ENTERTAINMENTS:
            return {...state, ...action.entertainments};
        case types.ENTERTAINMENTS_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.entertainments};
        default:
            return state;
    }
}
export default entertainmentsReducer;