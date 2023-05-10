import initialState from "./initialState";
import types from "../constants/reducers/audioStreamingConstants";

const audioStreamingReducer = (state = initialState.audioStreaming, action) => {
    switch(action.type) {
        case types.AUDIOSTREAMING_FETCHING:
            return action.audioStreaming;
        case types.AUDIOSTREAMING:
            return action.audioStreaming;
        case types.AUDIOSTREAMING_ERROR:
            //return initialState.audioStreaming
            return action.audioStreaming
        default:
            return state;
    }
}
export default audioStreamingReducer;