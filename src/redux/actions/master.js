import * as types from "./types";
import Services from "services";
import * as Actions from "redux/actions";

/**
 ** Master data module
 */
 export const fUpdateSupplier = data => ({
  type: types.UPDATE_MASTER_SUPPLIER,
  payload: data,
});
//** All master data */
export const fErrorMasterData = error => ({
  type: types.ERROR_MASTER_GET_ALL,
  payload: error,
});

export const fSuccessMasterData = data => ({
  type: types.SUCCESS_MASTER_GET_ALL,
  payload: data,
});

export const fFetchMasterData = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_MASTER_GET_ALL});

    Services.master.getAll(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessMasterData(res.data));
        } else {
          return dispatch(fErrorMasterData(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorMasterData(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};

//** Assets of User */
export const fErrorAssetsByUser = error => ({
  type: types.ERROR_ASSETS_BY_USER,
  payload: error,
});

export const fSuccessAssetsByUser = data => ({
  type: types.SUCCESS_ASSETS_BY_USER,
  payload: data,
});

export const fFetchAssetsByUser = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_ASSETS_BY_USER});

    Services.master.getAssetsByUser(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessAssetsByUser(res.data));
        } else {
          return dispatch(fErrorAssetsByUser(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorAssetsByUser(error));
        if (error.message && error.message.search("Authorization") !== -1) {
          let tmp = {
            RefreshToken: params.RefreshToken,
            Lang: params.Lang,
          };
          return dispatch(Actions.fFetchRefreshToken(tmp, history));
        }
      });
  };
};
