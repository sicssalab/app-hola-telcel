import initialState from "./initialState";
import types from "../constants/reducers/magicTownsConstants";

const magicTownsReducer = (state = initialState.magicTowns, action) => {
    switch(action.type) {
        case types.MAGICTOWNS_FETCHING:
            return {...state, ...action.magicTowns};
        case types.MAGICTOWNS:
            return {...state, ...action.magicTowns};
        case types.MAGICTOWNS_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.magicTowns};
        default:
            return state;
    }
}
export default magicTownsReducer;