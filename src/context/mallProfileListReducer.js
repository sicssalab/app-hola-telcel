import initialState from "./initialState";
import types from "../constants/reducers/mallsProfileListConstants";

const mallProfileListReducer = (state = initialState.mallProfileList, action) => {
    switch(action.type) {
        case types.MALL_PROFILELIST_FETCHING:
            return {...state, ...action.mallProfileList};
        case types.MALL_PROFILELIST:
            return {...state, ...action.mallProfileList};
        case types.MALL_PROFILELIST_ERROR:
            return {...state, ...action.mallProfileList};
        default:
            return state;
    }
}
export default mallProfileListReducer;