import initialState from "./initialState";
import types from "../constants/reducers/mallsStatesConstants";

const mallsStatesReducer = (state = initialState.mallsStates, action) => {
    switch(action.type) {
        case types.MALL_STATES_FETCHING:
            return {...state, ...action.mallsStates};
        case types.MALL_STATES:
            return {...state, ...action.mallsStates};
        case types.MALL_STATES_ERROR:
            return {...state, ...action.mallsStates};
        default:
            return state;
    }
}
export default mallsStatesReducer;