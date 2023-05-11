import initialState from "./initialState";
import types from "../constants/reducers/magicTownsProfileListConstants";

const magicTownProfileListReducer = (state = initialState.magicTownProfileList, action) => {
    switch(action.type) {
        case types.MAGICTOWNS_PROFILELIST_FETCHING:
            return {...state, ...action.magicTownProfileList};
        case types.MAGICTOWNS_PROFILELIST:
            return {...state, ...action.magicTownProfileList};
        case types.MAGICTOWNS_PROFILELIST_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.magicTownProfileList};
        default:
            return state;
    }
}
export default magicTownProfileListReducer;