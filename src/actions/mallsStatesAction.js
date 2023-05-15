import types from "../constants/reducers/mallsStatesConstants";
import settings from "../settings";
const getDispatch = (mallsStates) => {
  mallsStates.complete = true;
  mallsStates.loading = false;

  return { type: types.MALL_STATES, mallsStates };
};
const loading = () => {
  const mallsStates = {
    loading: true,
  };
  return { type: types.MALL_STATES_FETCHING, mallsStates };
};

const error = () => {
  const mallsStates = {
    error: true,
  };
  return { type: types.MALL_STATES_ERROR, mallsStates };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.mallsStates}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

const mallsStatesAction = {
  get,
};

export default mallsStatesAction;
