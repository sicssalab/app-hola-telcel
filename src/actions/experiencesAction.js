import types from "../constants/reducers/experiencesConstants";
import settings from "../settings";
const getDispatch = (experiences) => {
  experiences.complete = true;
  experiences.loading = false;

  return { type: types.EXPERIENCES, experiences };
};
const loading = () => {
  const experiences = {
    loading: true,
  };
  return { type: types.EXPERIENCES_FETCHING, experiences };
};

const error = () => {
  const experiences = {
    error: true,
  };
  return { type: types.EXPERIENCES_ERROR, experiences };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.experiences}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const experiencesAction = {
  get,
};

export default experiencesAction;
