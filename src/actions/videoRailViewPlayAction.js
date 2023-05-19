import types from "../constants/reducers/videoRailViewPlayConstants";
const get = (videoRailViewPlay) =>{
    return {type: types.VIDEORAILVIEWPLAY, videoRailViewPlay};
 };

const update = async (videoRailViewPlay, dispatch) => {
    dispatch(get(videoRailViewPlay));
}

const videoRailViewPlayAction = {
    update
}

export default videoRailViewPlayAction;