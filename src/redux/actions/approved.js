import * as types from "./types";
import Services from "services";
/** REDUX */
import * as Actions from "redux/actions";

/**
 ** Assets module
 */
/** All assets */
export const fErrorListAssets = error => ({
  type: types.ERROR_LIST_ASSETS,
  payload: error,
});

export const fSuccessListAssets = (type, data) => ({
  type: types.SUCCESS_LIST_ASSETS,
  payload: {type, data},
});

export const fFetchListAssets = (type, params) => {
  return dispatch => {
    dispatch({type: types.START_LIST_ASSETS});

    Services.approved.listAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListAssets(type, res));
        } else {
          return dispatch(fErrorListAssets(res.errorMessage));
        }
      })
      .catch(error => {
        return dispatch(fErrorListAssets(error));
      });
  };
};
