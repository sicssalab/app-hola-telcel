import types from "../constants/reducers/experiencesStatesConstants";
import settings from "../settings";
const getDispatch = (experiencesStates) => {
  experiencesStates.complete = true;
  experiencesStates.loading = false;

  return { type: types.EXPERIENCES_STATES, experiencesStates };
};
const loading = () => {
  const experiencesStates = {
    loading: true,
  };
  return { type: types.EXPERIENCES_STATES_FETCHING, experiencesStates };
};

const error = () => {
  const experiencesStates = {
    error: true,
  };
  return { type: types.EXPERIENCES_STATES_ERROR, experiencesStates };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.experiencesStates}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

const experiencesStatesAction = {
  get,
};

export default experiencesStatesAction;
