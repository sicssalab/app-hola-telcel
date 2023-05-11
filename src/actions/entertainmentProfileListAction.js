import types from "../constants/reducers/entertainmentsProfileListConstants";
import settings from "../settings";
const getDispatch = (entertainmentProfileList) => {
  entertainmentProfileList.complete = true;
  entertainmentProfileList.loading = false;

  return { type: types.ENTERTAINMENTS_PROFILELIST, entertainmentProfileList };
};
const loading = () => {
  const entertainmentProfileList = {
    loading: true,
  };
  return { type: types.ENTERTAINMENTS_PROFILELIST_FETCHING, entertainmentProfileList };
};

const error = () => {
  const entertainmentProfileList = {
    error: true,
  };
  return { type: types.ENTERTAINMENTS_PROFILELIST_ERROR, entertainmentProfileList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.entertainmentProfileList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const entertainmentProfileListAction = {
  get,
};

export default entertainmentProfileListAction;
