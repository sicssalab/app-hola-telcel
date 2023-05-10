import initialState from "./initialState";
import types from "../constants/reducers/storiesConstants";

const storiesReducer = (state = initialState.stories, action) => {
    switch(action.type) {
        case types.STORIES_FETCHING:
            return {...state, ...action.stories};
        case types.STORIES:
            return {...state, ...action.stories};
        case types.STORIES_ERROR:
            //return initialState.audioStreaming
            return {...state, ...action.stories};
        default:
            return state;
    }
}
export default storiesReducer;