import initialState from "./initialState";
import types from "../constants/reducers/userAuthConstants";

const userAuthReducer = (state = initialState.userAuth, action) => {
    switch(action.type) {
        case types.USERAUTH_FETCHING:
            return action.userAuth;
        case types.USERAUTH:
            return action.userAuth;
        case types.USERAUTH_ERROR:
            //return initialState.audioStreaming
            return action.userAuth
        default:
            return state;
    }
}

export default userAuthReducer;