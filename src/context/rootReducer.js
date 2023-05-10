import { combineReducers } from "redux";
import audioStreaming from "./audioStreamingReducer";
import stories from "./storiesReducer";
import entertainments from "./entertainmentsReducer";
import userAuth from "./userAuthReducer";
//import {combineReducers} from "react-redux";

const rootReducer = combineReducers({
    userAuth,
    audioStreaming,
    stories,
    entertainments,
})

export default rootReducer;