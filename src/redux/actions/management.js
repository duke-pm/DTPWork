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

//** Employee */
export const resetEmployee = () => ({
  type: types.RESET_EMPLOYEE,
});

export const fErrorEmployeeList = error => ({
  type: types.ERROR_EMPLOYEE_LIST,
  payload: error,
});

export const fSuccessEmployeeList = (data, count) => ({
  type: types.SUCCESS_EMPLOYEE_LIST,
  payload: {data, count},
});

export const fFetchEmployeeList = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_EMPLOYEE_LIST});

    Services.management.getEmployeeList(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessEmployeeList(res.data || [], res.totalRow));
        } else {
          return dispatch(fErrorEmployeeList(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorEmployeeList(error));
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

export const fErrorCreateEmployee = error => ({
  type: types.ERROR_CREATE_EMPLOYEE,
  payload: error,
});

export const fSuccessCreateEmployee = () => ({
  type: types.SUCCESS_CREATE_EMPLOYEE,
});

export const fFetchCreateEmployee = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_EMPLOYEE});

    Services.management.updateEmployee(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateEmployee());
        } else {
          return dispatch(fErrorCreateEmployee(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateEmployee(error));
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

export const fErrorUpdateEmployee = error => ({
  type: types.ERROR_UPDATE_EMPLOYEE,
  payload: error,
});

export const fSuccessUpdateEmployee = data => ({
  type: types.SUCCESS_UPDATE_EMPLOYEE,
  payload: data,
});

export const fFetchUpdateEmployee = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_EMPLOYEE});

    Services.management.updateEmployee(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateEmployee(res.data));
        } else {
          return dispatch(fErrorUpdateEmployee(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateEmployee(error));
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

//** Menu */
export const resetMenu = () => ({
  type: types.RESET_MENU,
});

export const fErrorMenuList = error => ({
  type: types.ERROR_MENU_LIST,
  payload: error,
});

export const fSuccessMenuList = (data, count) => ({
  type: types.SUCCESS_MENU_LIST,
  payload: {data, count},
});

export const fFetchMenuList = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_MENU_LIST});

    Services.management.getMenuList(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessMenuList(res.data || [], res.totalRow));
        } else {
          return dispatch(fErrorMenuList(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorMenuList(error));
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

export const fErrorCreateMenu = error => ({
  type: types.ERROR_CREATE_MENU,
  payload: error,
});

export const fSuccessCreateMenu = () => ({
  type: types.SUCCESS_CREATE_MENU,
});

export const fFetchCreateMenu = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_MENU});

    Services.management.updateMenu(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateMenu());
        } else {
          return dispatch(fErrorCreateMenu(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateMenu(error));
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

export const fErrorUpdateMenu = error => ({
  type: types.ERROR_UPDATE_MENU,
  payload: error,
});

export const fSuccessUpdateMenu = data => ({
  type: types.SUCCESS_UPDATE_MENU,
  payload: data,
});

export const fFetchUpdateMenu = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_MENU});

    Services.management.updateMenu(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateMenu(res.data));
        } else {
          return dispatch(fErrorUpdateMenu(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateMenu(error));
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