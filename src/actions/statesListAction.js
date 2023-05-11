import types from "../constants/reducers/statesListConstants";
import settings from "../settings";
const getDispatch = (statesList) => {
  statesList.complete = true;
  statesList.loading = false;

  return { type: types.STATESLIST, statesList };
};
const loading = () => {
  const statesList = {
    loading: true,
  };
  return { type: types.STATESLIST_FETCHING, statesList };
};

const error = () => {
  const statesList = {
    error: true,
  };
  return { type: types.STATESLIST_ERROR, statesList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.statesList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

const statesListAction = {
  get,
};

export default statesListAction;
