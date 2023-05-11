import types from "../constants/reducers/avenueProfileListConstants";
import settings from "../settings";
const getDispatch = (avenueProfileList) => {
  avenueProfileList.complete = true;
  avenueProfileList.loading = false;

  return { type: types.AVENUE_PROFILELIST, avenueProfileList };
};
const loading = () => {
  const avenueProfileList = {
    loading: true,
  };
  return { type: types.AVENUE_PROFILELIST_FETCHING, avenueProfileList };
};

const error = () => {
  const avenueProfileList = {
    error: true,
  };
  return { type: types.AVENUE_PROFILELIST_ERROR, avenueProfileList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.avenueProfileList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const avenueProfileListAction = {
  get,
};

export default avenueProfileListAction;
