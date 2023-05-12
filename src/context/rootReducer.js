import { combineReducers } from "redux";
import audioStreaming from "./audioStreamingReducer";
import stories from "./storiesReducer";
import entertainments from "./entertainmentsReducer";
import userAuth from "./userAuthReducer";
import statesList from "./statesListReducer";
import experiencesStates from "./experiencesStatesReducer";
import experiences from "./experiencesReducer";
import magicTowns from "./magicTownsReducer";
import entertainmentProfileList from "./entertainmentProfileListReducer";
import avenueProfileList from "./avenueProfileListReducer";
import experienceProfileList from "./experienceProfileListReducer";
import magicTownProfileList from "./magicTownProfileListReducer";

const rootReducer = combineReducers({
    userAuth,
    audioStreaming,
    stories,
    entertainments,
    experiences,
    experiencesStates,
    statesList,
    magicTowns,
    avenueProfileList,
    entertainmentProfileList,
    experienceProfileList,
    magicTownProfileList,
})

export default rootReducer;