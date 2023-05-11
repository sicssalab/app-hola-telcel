import types from "../constants/reducers/magicTownsProfileListConstants";
import settings from "../settings";

const getDispatch = (magicTownProfileList) => {
  magicTownProfileList.complete = true;
  magicTownProfileList.loading = false;

  return { type: types.MAGICTOWNS_PROFILELIST, magicTownProfileList };
};

const loading = () => {
  const magicTownProfileList = {
    loading: true,
  };
  return { type: types.MAGICTOWNS_PROFILELIST_FETCHING, magicTownProfileList };
};

const error = () => {
  const magicTownProfileList = {
    error: true,
  };
  return { type: types.MAGICTOWNS_PROFILELIST_ERROR, magicTownProfileList };
};

const get = async (request, dispatch) => {
  dispatch(loading());
  try {
    await fetch(`${settings.domain}${settings.api.magicTownProfileList}`)
      .then((res) => res.json())
      .then((response) => {
        dispatch(getDispatch(response));magicTownProfileList
    });
  } catch (e) {
    dispatch(error());
  }
};

const magicTownProfileListAction = {
  get,
};

export default magicTownProfileListAction;
