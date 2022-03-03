import * as types from "./types";
import * as Actions from "redux/actions";
import Services from "services";

//** Employee group */
export const resetEmployeeGroup = () => ({
  type: types.RESET_EMPLOYEE_GROUP,
});

export const fErrorEmployeeGroup = error => ({
  type: types.ERROR_EMPLOYEE_GROUP,
  payload: error,
});

export const fSuccessEmployeeGroup = (data, count) => ({
  type: types.SUCCESS_EMPLOYEE_GROUP,
  payload: {data, count},
});

export const fFetchEmployeeGroup = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_EMPLOYEE_GROUP});

    Services.management.getEmployeeGroup(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessEmployeeGroup(res.data || [], res.totalRow));
        } else {
          return dispatch(fErrorEmployeeGroup(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorEmployeeGroup(error));
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

export const fErrorCreateEmployeeGroup = error => ({
  type: types.ERROR_CREATE_EMPLOYEE_GROUP,
  payload: error,
});

export const fSuccessCreateEmployeeGroup = () => ({
  type: types.SUCCESS_CREATE_EMPLOYEE_GROUP
});

export const fFetchCreateEmployeeGroup = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_EMPLOYEE_GROUP});

    Services.management.updateEmployeeGroup(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateEmployeeGroup());
        } else {
          return dispatch(fErrorCreateEmployeeGroup(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateEmployeeGroup(error));
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

export const fErrorUpdateEmployeeGroup = error => ({
  type: types.ERROR_UPDATE_EMPLOYEE_GROUP,
  payload: error,
});

export const fSuccessUpdateEmployeeGroup = data => ({
  type: types.SUCCESS_UPDATE_EMPLOYEE_GROUP,
  payload: data,
});

export const fFetchUpdateEmployeeGroup = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_EMPLOYEE_GROUP});

    Services.management.updateEmployeeGroup(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateEmployeeGroup(res.data));
        } else {
          return dispatch(fErrorUpdateEmployeeGroup(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateEmployeeGroup(error));
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

export const fErrorRemoveEmployeeGroup = error => ({
  type: types.ERROR_UPDATE_EMPLOYEE_GROUP,
  payload: error,
});

export const fSuccessRemoveEmployeeGroup = () => ({
  type: types.SUCCESS_UPDATE_EMPLOYEE_GROUP,
});

export const fFetchRemoveEmployeeGroup = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_EMPLOYEE_GROUP});

    Services.management.removeEmployeeGroup(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveEmployeeGroup());
        } else {
          return dispatch(fErrorRemoveEmployeeGroup(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveEmployeeGroup(error));
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