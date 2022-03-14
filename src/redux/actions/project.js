import * as types from "./types";
import * as Actions from "redux/actions";
import Services from "services";

//** List projects */
export const resetProject = () => ({
  type: types.RESET_PROJECT,
});

export const fErrorListProject = error => ({
  type: types.ERROR_LIST_PROJECT,
  payload: error,
});

export const fSuccessListProject = (data, count) => ({
  type: types.SUCCESS_LIST_PROJECT,
  payload: {data, count},
});

export const fFetchListProject = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_PROJECT});

    Services.project.listProject(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListProject(
            res.data || [],
            res.totalRow,
          ));
        } else {
          return dispatch(fErrorListProject(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListProject(error));
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

export const fErrorCreateProject = error => ({
  type: types.ERROR_CREATE_PROJECT,
  payload: error,
});

export const fSuccessCreateProject = () => ({
  type: types.SUCCESS_CREATE_PROJECT,
});

export const fFetchCreateProject = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_PROJECT});

    Services.project.updateProject(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateProject());
        } else {
          return dispatch(fErrorCreateProject(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateProject(error));
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

export const fErrorUpdateProject = error => ({
  type: types.ERROR_UPDATE_PROJECT,
  payload: error,
});

export const fSuccessUpdateProject = data => ({
  type: types.SUCCESS_UPDATE_PROJECT,
  payload: data
});

export const fFetchUpdateProject = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_PROJECT});

    Services.project.updateProject(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateProject(res.data));
        } else {
          return dispatch(fErrorUpdateProject(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateProject(error));
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

export const fErrorRemoveProject = error => ({
  type: types.ERROR_REMOVE_PROJECT,
  payload: error,
});

export const fSuccessRemoveProject = () => ({
  type: types.SUCCESS_REMOVE_PROJECT,
});

export const fFetchRemoveProject = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_PROJECT});

    Services.project.removeProject(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveProject());
        } else {
          return dispatch(fErrorRemoveProject(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveProject(error));
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

//** List task */
export const resetTask = () => ({
  type: types.RESET_TASK,
});

export const fErrorListTask = error => ({
  type: types.ERROR_LIST_TASK,
  payload: error,
});

export const fSuccessListTask = (data, count) => ({
  type: types.SUCCESS_LIST_TASK,
  payload: {data, count},
});

export const fFetchListTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_TASK});

    Services.project.listTask(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListTask(
            res.data.listTask || [],
            res.totalRow,
          ));
        } else {
          return dispatch(fErrorListTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListTask(error));
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

export const fErrorCreateTask = error => ({
  type: types.ERROR_CREATE_TASK,
  payload: error,
});

export const fSuccessCreateTask = () => ({
  type: types.SUCCESS_CREATE_TASK,
});

export const fFetchCreateTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_TASK});

    Services.project.updateTask(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateTask());
        } else {
          return dispatch(fErrorCreateTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateTask(error));
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

export const fErrorUpdateTask = error => ({
  type: types.ERROR_UPDATE_TASK,
  payload: error,
});

export const fSuccessUpdateTask = data => ({
  type: types.SUCCESS_UPDATE_TASK,
  payload: data
});

export const fFetchUpdateTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_TASK});

    Services.project.updateTask(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateTask(res.data));
        } else {
          return dispatch(fErrorUpdateTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateTask(error));
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

export const fErrorRemoveTask = error => ({
  type: types.ERROR_REMOVE_TASK,
  payload: error,
});

export const fSuccessRemoveTask = () => ({
  type: types.SUCCESS_REMOVE_TASK,
});

export const fFetchRemoveTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_TASK});

    Services.project.removeTask(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveTask());
        } else {
          return dispatch(fErrorRemoveTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveTask(error));
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
