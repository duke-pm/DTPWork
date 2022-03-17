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

export const fErrorListTaskAll = error => ({
  type: types.ERROR_LIST_TASK_ALL,
  payload: error,
});

export const fSuccessListTaskAll = data => ({
  type: types.SUCCESS_LIST_TASK_ALL,
  payload: data,
});

export const fFetchListTaskAll = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_LIST_TASK_ALL});

    Services.project.listTaskAll(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessListTaskAll(
            res.data.listTask || []
          ));
        } else {
          return dispatch(fErrorListTaskAll(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorListTaskAll(error));
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

export const fErrorUpdateGanttTask = error => ({
  type: types.ERROR_UPDATE_GANTT_TASK,
  payload: error,
});

export const fSuccessUpdateGanttTask = () => ({
  type: types.SUCCESS_UPDATE_GANTT_TASK,
});

export const fFetchUpdateGanttTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_GANTT_TASK});

    Services.project.updateGanttTask(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateGanttTask());
        } else {
          return dispatch(fErrorUpdateGanttTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateGanttTask(error));
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

export const fErrorTaskDetails = error => ({
  type: types.ERROR_TASK_DETAILS,
  payload: error,
});

export const fSuccessTaskDetails = data => ({
  type: types.SUCCESS_TASK_DETAILS,
  payload: data,
});

export const fFetchTaskDetails = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_TASK_DETAILS});

    Services.project.taskDetails(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessTaskDetails(res.data));
        } else {
          return dispatch(fErrorTaskDetails(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorTaskDetails(error));
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

export const fErrorCreateComment = error => ({
  type: types.ERROR_CREATE_COMMENT,
  payload: error,
});

export const fSuccessCreateComment = data => ({
  type: types.SUCCESS_CREATE_COMMENT,
  payload: data,
});

export const fFetchCreateComment = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_COMMENT});

    Services.project.createComment(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateComment(res.data));
        } else {
          return dispatch(fErrorCreateComment(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateComment(error));
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

export const fErrorFollow = error => ({
  type: types.ERROR_FOLLOW,
  payload: error,
});

export const fSuccessFollow = (data, userName) => ({
  type: types.SUCCESS_FOLLOW,
  payload: {data, userName},
});

export const fFetchFollow = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_FOLLOW});

    Services.project.follow(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessFollow(res.data, params.UserName));
        } else {
          return dispatch(fErrorFollow(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorFollow(error));
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

export const fErrorChangeProgressTask = error => ({
  type: types.ERROR_CHANGE_PROGRESS_TASK,
  payload: error,
});

export const fSuccessChangeProgressTask = data => ({
  type: types.SUCCESS_CHANGE_PROGRESS_TASK,
  payload: data,
});

export const fFetchChangeProgressTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CHANGE_PROGRESS_TASK});

    Services.project.taskUpdate(params)
      .then(res => {
        if (!res.isError) {
          let dataTask = null;
          if (res.data.length > 0) {
            dataTask = {
              status: {
                statusID: res.data[0].statusID,
                statusName: res.data[0].statusName,
                colorCode: res.data[0].colorCode,
                colorDarkCode: res.data[0].colorDarkCode,
                colorOpacityCode: res.data[0].colorOpacityCode,
              },
              percentage: res.data[0].percentage,
            };
          } else {
            dataTask = {
              status: {
                statusID: res.data.statusID,
                statusName: res.data.statusName,
                colorCode: res.data.colorCode,
                colorDarkCode: res.data.colorDarkCode,
                colorOpacityCode: res.data.colorOpacityCode,
              },
              percentage: res.data.percentage,
            };
          }
          return dispatch(fSuccessChangeProgressTask(dataTask));
        } else {
          return dispatch(fErrorChangeProgressTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorChangeProgressTask(error));
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

export const fErrorChangeStatusTask = error => ({
  type: types.ERROR_CHANGE_STATUS_TASK,
  payload: error,
});

export const fSuccessChangeStatusTask = data => ({
  type: types.SUCCESS_CHANGE_STATUS_TASK,
  payload: data,
});

export const fFetchChangeStatusTask = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CHANGE_STATUS_TASK});

    Services.project.taskUpdate(params)
      .then(res => {
        if (!res.isError) {
          let dataTask = null;
          if (res.data.length > 0) {
            dataTask = {
              status: {
                statusID: res.data[0].statusID,
                statusName: res.data[0].statusName,
                colorCode: res.data[0].colorCode,
                colorDarkCode: res.data[0].colorDarkCode,
                colorOpacityCode: res.data[0].colorOpacityCode,
              },
              percentage: res.data[0].percentage,
            };
          } else {
            dataTask = {
              status: {
                statusID: res.data.statusID,
                statusName: res.data.statusName,
                colorCode: res.data.colorCode,
                colorDarkCode: res.data.colorDarkCode,
                colorOpacityCode: res.data.colorOpacityCode,
              },
              percentage: res.data.percentage,
            };
          }
          return dispatch(fSuccessChangeStatusTask(dataTask));
        } else {
          return dispatch(fErrorChangeStatusTask(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorChangeStatusTask(error));
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

export const fErrorProjectsOverview = error => ({
  type: types.ERROR_PROJECTS_OVERVIEW,
  payload: error,
});

export const fSuccessProjectsOverview = projects => ({
  type: types.SUCCESS_PROJECTS_OVERVIEW,
  payload: projects,
});

export const fFetchProjectsOverview = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_PROJECTS_OVERVIEW});

    Services.project.listProjectsOverview(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessProjectsOverview({
            data: res.data,
            rows: res.totalRow || 0,
          }));
        } else {
          return dispatch(fErrorProjectsOverview(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorProjectsOverview(error));
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
