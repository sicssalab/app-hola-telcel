import types from "../constants/reducers/userAuthConstants";

const get = (userAuth) =>{
    return {type: types.USERAUTH, userAuth};
};

const update = async (userAuth, dispatch) => {
    dispatch(get(userAuth));
}
const premium = async (dispatch) => {
    const userAuth = {
        isPremium: true,
    }
    dispatch(get(userAuth));
}

const userAuthAction = {
    update,
    premium,
}

export default userAuthAction;