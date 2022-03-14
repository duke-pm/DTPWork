import * as types from "./types";
import Services from "services";
import * as Actions from "redux/actions";

/**
 ** Master data module
 */
export const resetMasterData = () => ({
  type: types.RESET_MASTER_DATA,
});

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

//** Users by Login */
export const fErrorUsersByLogin = error => ({
  type: types.ERROR_USERS_BY_LOGIN,
  payload: error,
});

export const fSuccessUsersByLogin = data => ({
  type: types.SUCCESS_USERS_BY_LOGIN,
  payload: data,
});

export const fFetchUsersByLogin = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_USERS_BY_LOGIN});

    Services.master.getUsersByLogin()
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUsersByLogin(res.data));
        } else {
          return dispatch(fErrorUsersByLogin(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUsersByLogin(error));
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

//** Sub Projects */
export const fErrorSubProjects = error => ({
  type: types.ERROR_PROJECTS_SUB,
  payload: error,
});

export const fSuccessSubProjects = data => ({
  type: types.SUCCESS_PROJECTS_SUB,
  payload: data,
});

export const fFetchSubProjects = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_PROJECTS_SUB});

    Services.master.getSubProjects()
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessSubProjects(res.data));
        } else {
          return dispatch(fErrorSubProjects(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorSubProjects(error));
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

//** Sub Tasks */
export const fErrorSubTasks = error => ({
  type: types.ERROR_TASKS_SUB,
  payload: error,
});

export const fSuccessSubTasks = data => ({
  type: types.SUCCESS_TASKS_SUB,
  payload: data,
});

export const fFetchSubTasks = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_TASKS_SUB});

    Services.master.getSubTasks(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessSubTasks(res.data));
        } else {
          return dispatch(fErrorSubTasks(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorSubTasks(error));
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
