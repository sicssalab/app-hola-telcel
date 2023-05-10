import types from "../constants/reducers/storiesConstants";
import settings from "../settings";
const getDispatch = (stories) => {
  stories.complete = true;
  stories.loading = false;

  return { type: types.STORIES, stories };
};
const loading = () => {
  const stories = {
    loading: true,
  };
  return { type: types.STORIES_FETCHING, stories };
};

const error = () => {
  const stories = {
    error: true,
  };
  return { type: types.STORIES_ERROR, stories };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}/${settings.api.stories}`)
      .then((res) => res.json())
      .then((data) => {
        const response = {
            data: data.stories
        }
        // console.log("dividor")
        // console.log(response)
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const storiesAction = {
  get,
};

export default storiesAction;
