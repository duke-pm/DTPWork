import * as types from "./types";
import Services from "services";
import * as Actions from "redux/actions";
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

export const fFetchListAssets = (type, params, history) => {
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
        dispatch(fErrorListAssets(error));
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

//** History asset */
export const fErrorHistoryAsset = error => ({
  type: types.ERROR_HISTORY_ASSET,
  payload: error,
});

export const fSuccessHistoryAsset = data => ({
  type: types.SUCCESS_HISTORY_ASSET,
  payload: data,
});

export const fFetchHistoryAsset = (params, history) => {
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
        dispatch(fErrorHistoryAsset(error));
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

//** Get data Employee */
export const fErrorDataEmployee = error => ({
  type: types.ERROR_DATA_EMPLOYEE,
  payload: error,
});

export const fSuccessDataEmployee = () => ({
  type: types.SUCCESS_DATA_EMPLOYEE,
});

export const fFetchDataEmployee = (params, history) => {
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
        dispatch(fErrorDataEmployee(error));
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

//** Create/Update data assets */
export const fResetCreateAssets = () => ({
  type: types.RESET_CREATE_ASSETS,
});

export const fErrorCreateAssets = error => ({
  type: types.ERROR_CREATE_ASSETS,
  payload: error,
});

export const fSuccessCreateAssets = () => ({
  type: types.SUCCESS_CREATE_ASSETS,
});

export const fFetchCreateAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_ASSETS});

    Services.approved.createAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateAssets());
        } else {
          return dispatch(fErrorCreateAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateAssets(error));
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

export const fErrorUpdateAssets = error => ({
  type: types.ERROR_UPDATE_ASSETS,
  payload: error,
});

export const fSuccessUpdateAssets = () => ({
  type: types.SUCCESS_UPDATE_ASSETS,
});

export const fFetchUpdateAssets = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_ASSETS});

    Services.approved.updateAssets(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateAssets());
        } else {
          return dispatch(fErrorUpdateAssets(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateAssets(error));
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
