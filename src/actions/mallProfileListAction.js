import types from "../constants/reducers/mallsProfileListConstants";
import settings from "../settings";
const getDispatch = (mallProfileList) => {
  mallProfileList.complete = true;
  mallProfileList.loading = false;

  return { type: types.MALL_PROFILELIST, mallProfileList };
};
const loading = () => {
  const mallProfileList = {
    loading: true,
  };
  return { type: types.MALL_PROFILELIST_FETCHING, mallProfileList };
};

const error = () => {
  const mallProfileList = {
    error: true,
  };
  return { type: types.MALL_PROFILELIST_ERROR, mallProfileList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.mallProfileList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    console.error(e);
    dispatch(error());
  }
};

const mallProfileListAction = {
  get,
};

export default mallProfileListAction;
