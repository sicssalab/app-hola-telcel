import types from "../constants/reducers/experienceProfileListConstants";
import settings from "../settings";
const getDispatch = (experienceProfileList) => {
  experienceProfileList.complete = true;
  experienceProfileList.loading = false;

  return { type: types.EXPERIENCES_PROFILELIST, experienceProfileList };
};
const loading = () => {
  const experienceProfileList = {
    loading: true,
  };
  return { type: types.EXPERIENCES_PROFILELIST_FETCHING, experienceProfileList };
};

const error = () => {
  const experienceProfileList = {
    error: true,
  };
  return { type: types.EXPERIENCES_PROFILELIST_ERROR, experienceProfileList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.experienceProfileList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));
    });
  } catch (e) {
    dispatch(error());
  }
};

const experienceProfileListAction = {
  get,
};

export default experienceProfileListAction;
