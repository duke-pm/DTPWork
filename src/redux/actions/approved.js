import * as types from "./types";
import Services from "services";

/**
 ** Assets module
 */
//** All assets */
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

//** History asset */
export const fErrorHistoryAsset = error => ({
  type: types.ERROR_HISTORY_ASSET,
  payload: error,
});

export const fSuccessHistoryAsset = data => ({
  type: types.SUCCESS_HISTORY_ASSET,
  payload: data,
});

export const fFetchHistoryAsset = (params) => {
  return dispatch => {
    dispatch({type: types.START_HISTORY_ASSET});

    Services.approved.historyAsset(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessHistoryAsset(res.data.listTransHistory));
        } else {
          return dispatch(fErrorHistoryAsset(res.errorMessage));
        }
      })
      .catch(error => {
        return dispatch(fErrorHistoryAsset(error));
      });
  };
};

//** Get data Employee */
export const fErrorDataEmployee = error => ({
  type: types.ERROR_DATA_EMPLOYEE,
  payload: error,
});

export const fSuccessDataEmployee = () => ({
  type: types.SUCCESS_DATA_EMPLOYEE,
});

export const fFetchDataEmployee = () => {
  return dispatch => {
    dispatch({type: types.START_DATA_EMPLOYEE});

    Services.approved.dataEmployee()
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessDataEmployee());
        } else {
          return dispatch(fErrorDataEmployee(res.errorMessage));
        }
      })
      .catch(error => {
        return dispatch(fErrorDataEmployee(error));
      });
  };
};
