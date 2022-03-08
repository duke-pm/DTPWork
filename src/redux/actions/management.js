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

//** Role */
export const resetRole = () => ({
  type: types.RESET_ROLE,
});

export const fErrorRoleList = error => ({
  type: types.ERROR_ROLE_LIST,
  payload: error,
});

export const fSuccessRoleList = data => ({
  type: types.SUCCESS_ROLE_LIST,
  payload: data,
});

export const fFetchRoleList = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_ROLE_LIST});

    Services.management.getRoleList(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRoleList(res.data));
        } else {
          return dispatch(fErrorRoleList(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRoleList(error));
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

export const updateRoleLocal = data => ({
  type: types.UPDATE_ROLE_LOCAL,
  payload: {menuID: data.menuID, update: data.update},
});

export const fErrorUpdateRole = error => ({
  type: types.ERROR_UPDATE_ROLE,
  payload: error,
});

export const fSuccessUpdateRole = data => ({
  type: types.SUCCESS_UPDATE_ROLE,
  payload: data,
});

export const fFetchUpdateRole = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_ROLE});

    Services.management.updateRole(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateRole(res.data));
        } else {
          return dispatch(fErrorUpdateRole(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateRole(error));
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

//** Approved lines */
export const resetApprovedLines = () => ({
  type: types.RESET_APPROVED_LINES,
});

export const fErrorApprovedLines = error => ({
  type: types.ERROR_APPROVED_LINES,
  payload: error,
});

export const fSuccessApprovedLines = (data, count) => ({
  type: types.SUCCESS_APPROVED_LINES,
  payload: {data, count},
});

export const fFetchApprovedLines = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_APPROVED_LINES});

    Services.management.getApprovedLines(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessApprovedLines(res.data || [], res.totalRow));
        } else {
          return dispatch(fErrorApprovedLines(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorApprovedLines(error));
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

export const fErrorCreateApprovedLines = error => ({
  type: types.ERROR_CREATE_APPROVED_LINES,
  payload: error,
});

export const fSuccessCreateApprovedLines = () => ({
  type: types.SUCCESS_CREATE_APPROVED_LINES,
});

export const fFetchCreateApprovedLines = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_APPROVED_LINES});

    Services.management.updateApprovedLines(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateApprovedLines());
        } else {
          return dispatch(fErrorCreateApprovedLines(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateApprovedLines(error));
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

export const fErrorUpdateApprovedLines = error => ({
  type: types.ERROR_UPDATE_APPROVED_LINES,
  payload: error,
});

export const fSuccessUpdateApprovedLines = data => ({
  type: types.SUCCESS_UPDATE_APPROVED_LINES,
  payload: data,
});

export const fFetchUpdateApprovedLines = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_APPROVED_LINES});

    Services.management.updateApprovedLines(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateApprovedLines(res.data));
        } else {
          return dispatch(fErrorUpdateApprovedLines(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateApprovedLines(error));
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

export const fErrorRemoveApprovedLines = error => ({
  type: types.ERROR_REMOVE_APPROVED_LINES,
  payload: error,
});

export const fSuccessRemoveApprovedLines = roleID => ({
  type: types.SUCCESS_REMOVE_APPROVED_LINES,
  payload: {roleID},
});

export const fFetchRemoveApprovedLines = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_APPROVED_LINES});

    Services.management.removeApprovedLines(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveApprovedLines(params.RoleID));
        } else {
          return dispatch(fErrorRemoveApprovedLines(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveApprovedLines(error));
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

//** Approved levels */
export const resetApprovedLevels = () => ({
  type: types.RESET_APPROVED_LEVELS,
});

export const fErrorApprovedLevels = error => ({
  type: types.ERROR_APPROVED_LEVELS,
  payload: error,
});

export const fSuccessApprovedLevels = (data, count) => ({
  type: types.SUCCESS_APPROVED_LEVELS,
  payload: {data, count},
});

export const fFetchApprovedLevels = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_APPROVED_LEVELS});

    Services.management.getApprovedLevels(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessApprovedLevels(res.data || [], res.totalRow));
        } else {
          return dispatch(fErrorApprovedLevels(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorApprovedLevels(error));
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

export const fErrorCreateApprovedLevels = error => ({
  type: types.ERROR_CREATE_APPROVED_LEVELS,
  payload: error,
});

export const fSuccessCreateApprovedLevels = () => ({
  type: types.SUCCESS_CREATE_APPROVED_LEVELS,
});

export const fFetchCreateApprovedLevels = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_APPROVED_LEVELS});

    Services.management.updateApprovedLevels(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateApprovedLevels());
        } else {
          return dispatch(fErrorCreateApprovedLevels(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateApprovedLevels(error));
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

export const fErrorUpdateApprovedLevels = error => ({
  type: types.ERROR_UPDATE_APPROVED_LEVELS,
  payload: error,
});

export const fSuccessUpdateApprovedLevels = data => ({
  type: types.SUCCESS_UPDATE_APPROVED_LEVELS,
  payload: data,
});

export const fFetchUpdateApprovedLevels = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_APPROVED_LEVELS});

    Services.management.updateApprovedLevels(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateApprovedLevels(res.data));
        } else {
          return dispatch(fErrorUpdateApprovedLevels(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateApprovedLevels(error));
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

export const fErrorRemoveApprovedLevels = error => ({
  type: types.ERROR_REMOVE_APPROVED_LEVELS,
  payload: error,
});

export const fSuccessRemoveApprovedLevels = absID => ({
  type: types.SUCCESS_REMOVE_APPROVED_LEVELS,
  payload: {absID},
});

export const fFetchRemoveApprovedLevels = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_APPROVED_LEVELS});

    Services.management.removeApprovedLevels(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveApprovedLevels(params.AbsID));
        } else {
          return dispatch(fErrorRemoveApprovedLevels(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveApprovedLevels(error));
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
