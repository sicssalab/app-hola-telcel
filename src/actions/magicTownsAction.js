import types from "../constants/reducers/magicTownsConstants";
import settings from "../settings";
const getDispatch = (magicTowns) => {
  magicTowns.complete = true;
  magicTowns.loading = false;

  return { type: types.MAGICTOWNS, magicTowns };
};
const loading = () => {
  const magicTowns = {
    loading: true,
  };
  return { type: types.MAGICTOWNS_FETCHING, magicTowns };
};

const error = () => {
  const magicTowns = {
    error: true,
  };
  return { type: types.MAGICTOWNS_ERROR, magicTowns };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.magicTowns}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const magicTownsAction = {
  get,
};

export default magicTownsAction;
