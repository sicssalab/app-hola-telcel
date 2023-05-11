import types from "../constants/reducers/entertainmentsConstants";
import settings from "../settings";
const getDispatch = (entertainments) => {
  entertainments.complete = true;
  entertainments.loading = false;

  return { type: types.ENTERTAINMENTS, entertainments };
};
const loading = () => {
  const entertainments = {
    loading: true,
  };
  return { type: types.ENTERTAINMENTS_FETCHING, entertainments };
};

const error = () => {
  const entertainments = {
    error: true,
  };
  return { type: types.ENTERTAINMENTS_ERROR, entertainments };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.entertainments}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const entertainmentsAction = {
  get,
};

export default entertainmentsAction;
