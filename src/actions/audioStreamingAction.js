import types from "../constants/reducers/audioStreamingConstants";
const get = (audioStreaming) =>{
    return {type: types.AUDIOSTREAMING, audioStreaming};
 };

const update = async (audioStreaming, dispatch) => {
    dispatch(get(audioStreaming));
}

const audioStreamingAction = {
    update
}

export default audioStreamingAction;