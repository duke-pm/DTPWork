import * as types from "./types";
import * as Actions from "redux/actions";
import Services from "services";

//** Booking all */
export const resetBooking = () => ({
  type: types.RESET_BOOKING,
});

export const fErrorAllBooking = error => ({
  type: types.ERROR_ALL_BOOKING,
  payload: error,
});

export const fSuccessAllBooking = (header, data, count) => ({
  type: types.SUCCESS_ALL_BOOKING,
  payload: {header, data, count},
});

export const fFetchAllBooking = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_ALL_BOOKING});

    Services.booking.listBooking(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessAllBooking(
            res.data.header[0] || null,
            res.data.lstBooking || [],
            res.totalRow,
          ));
        } else {
          return dispatch(fErrorAllBooking(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorAllBooking(error));
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

export const fErrorCreateBooking = error => ({
  type: types.ERROR_CREATE_BOOKING,
  payload: error,
});

export const fSuccessCreateBooking = (data, count) => ({
  type: types.SUCCESS_CREATE_BOOKING,
  payload: {data, count},
});

export const fFetchCreateBooking = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_BOOKING});

    Services.booking.updateBooking(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateBooking());
        } else {
          return dispatch(fErrorCreateBooking(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateBooking(error));
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

export const fErrorUpdateBooking = error => ({
  type: types.ERROR_UPDATE_BOOKING,
  payload: error,
});

export const fSuccessUpdateBooking = data => ({
  type: types.SUCCESS_UPDATE_BOOKING,
  payload: data,
});

export const fFetchUpdateBooking = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_BOOKING});

    Services.booking.updateBooking(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateBooking(res.data));
        } else {
          return dispatch(fErrorUpdateBooking(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateBooking(error));
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

export const fErrorRemoveBooking = error => ({
  type: types.ERROR_REMOVE_BOOKING,
  payload: error,
});

export const fSuccessRemoveBooking = () => ({
  type: types.SUCCESS_REMOVE_BOOKING,
});

export const fFetchRemoveBooking = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_BOOKING});

    Services.booking.removeBooking(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveBooking());
        } else {
          return dispatch(fErrorRemoveBooking(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveBooking(error));
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

//** Booking - group resource */
export const resetResource = () => ({
  type: types.RESET_RESOURCE,
});

export const fErrorGroupResource = error => ({
  type: types.ERROR_GROUP_RESOURCE,
  payload: error,
});

export const fSuccessGroupResource = (data, count) => ({
  type: types.SUCCESS_GROUP_RESOURCE,
  payload: {data, count},
});

export const fFetchGroupResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_GROUP_RESOURCE});

    Services.booking.listGroupResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessGroupResource(
            res.data || [],
            res.totalRow,
          ));
        } else {
          return dispatch(fErrorGroupResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorGroupResource(error));
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

export const fErrorCreateGroupResource = error => ({
  type: types.ERROR_CREATE_GROUP_RESOURCE,
  payload: error,
});

export const fSuccessCreateGroupResource = (data, count) => ({
  type: types.SUCCESS_CREATE_GROUP_RESOURCE,
  payload: {data, count},
});

export const fFetchCreateGroupResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_GROUP_RESOURCE});

    Services.booking.updateGroupResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateGroupResource());
        } else {
          return dispatch(fErrorCreateGroupResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateGroupResource(error));
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

export const fErrorUpdateGroupResource = error => ({
  type: types.ERROR_UPDATE_GROUP_RESOURCE,
  payload: error,
});

export const fSuccessUpdateGroupResource = data => ({
  type: types.SUCCESS_UPDATE_GROUP_RESOURCE,
  payload: data,
});

export const fFetchUpdateGroupResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_GROUP_RESOURCE});

    Services.booking.updateGroupResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateGroupResource(res.data));
        } else {
          return dispatch(fErrorUpdateGroupResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateGroupResource(error));
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

export const fErrorRemoveGroupResource = error => ({
  type: types.ERROR_REMOVE_GROUP_RESOURCE,
  payload: error,
});

export const fSuccessRemoveGroupResource = groupID => ({
  type: types.SUCCESS_REMOVE_GROUP_RESOURCE,
  payload: {groupID},
});

export const fFetchRemoveGroupResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_GROUP_RESOURCE});

    Services.booking.removeGroupResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveGroupResource(params.groupID));
        } else {
          return dispatch(fErrorRemoveGroupResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveGroupResource(error));
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

export const fErrorResource = error => ({
  type: types.ERROR_RESOURCE,
  payload: error,
});

export const fSuccessResource = (data, count) => ({
  type: types.SUCCESS_RESOURCE,
  payload: {data, count},
});

export const fFetchResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_RESOURCE});

    Services.booking.listResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessResource(
            res.data || [],
            res.totalRow,
          ));
        } else {
          return dispatch(fErrorResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorResource(error));
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

export const fErrorCreateResource = error => ({
  type: types.ERROR_CREATE_RESOURCE,
  payload: error,
});

export const fSuccessCreateResource = (data, count) => ({
  type: types.SUCCESS_CREATE_RESOURCE,
  payload: {data, count},
});

export const fFetchCreateResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_CREATE_RESOURCE});

    Services.booking.updateResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCreateResource());
        } else {
          return dispatch(fErrorCreateResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorCreateResource(error));
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

export const fErrorUpdateResource = error => ({
  type: types.ERROR_UPDATE_RESOURCE,
  payload: error,
});

export const fSuccessUpdateResource = data => ({
  type: types.SUCCESS_UPDATE_RESOURCE,
  payload: data,
});

export const fFetchUpdateResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_UPDATE_RESOURCE});

    Services.booking.updateResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessUpdateResource(res.data));
        } else {
          return dispatch(fErrorUpdateResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorUpdateResource(error));
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

export const fErrorRemoveResource = error => ({
  type: types.ERROR_REMOVE_RESOURCE,
  payload: error,
});

export const fSuccessRemoveResource = resourceID => ({
  type: types.SUCCESS_REMOVE_RESOURCE,
  payload: {resourceID},
});

export const fFetchRemoveResource = (params, history) => {
  return dispatch => {
    dispatch({type: types.START_REMOVE_RESOURCE});

    Services.booking.removeResource(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessRemoveResource(params.resourceID));
        } else {
          return dispatch(fErrorRemoveResource(res.errorMessage));
        }
      })
      .catch(error => {
        dispatch(fErrorRemoveResource(error));
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
