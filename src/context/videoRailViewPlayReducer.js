import initialState from "./initialState";
import types from "../constants/reducers/videoRailViewPlayConstants";

const videoRailViewPlayReducer = (state = initialState.videoRailViewPlay, action) => {

    switch(action.type) {
        case types.VIDEORAILVIEWPLAY_FETCHING:
            return {...state, ...action.videoRailViewPlay};
        case types.VIDEORAILVIEWPLAY:
            return {...state, ...action.videoRailViewPlay};
        case types.VIDEORAILVIEWPLAY_ERROR:
            return {...state, ...action.videoRailViewPlay};
        default:
            return state;
    }
}
export default videoRailViewPlayReducer;