import * as types from "./types";
import Services from "services";
import API from "services/axios";
import FieldsAuth from "configs/fieldsAuth";
import Constants from "utils/constants";
import {setCookies} from "utils/Utils";
//** REDUX */
import * as Actions from "redux/actions";

//** Sign out module */
export const fSignout = () => ({
  type: types.SIGN_OUT,
});

//** Sign in module */
export const fErrorSignIn = error => ({
  type: types.ERROR_SIGN_IN,
  payload: error,
});

export const fSuccessSignIn = (data, isRefresh = false) => {
  let payload = {}, item;
  if (isRefresh) {
    API.defaults.headers.Authorization =
      "Bearer " + data.access_token;
    setCookies("access_token", data.access_token);

    for (item of FieldsAuth) {
      payload[item.value] = data[item.key];
    }
  } else {
    API.defaults.headers.Authorization =
      "Bearer " + data.tokenInfo.access_token;
    setCookies("access_token", data.tokenInfo.access_token);

    for (item of FieldsAuth) {
      payload[item.value] = data.tokenInfo[item.key];
    }
  }
  if (data["lstMenu"]) {
    payload["lstMenu"] = data["lstMenu"];
  }

  // Check list menu master
  // if (data["lstMenu"]) {
  //   if (data[FieldsAuth[0].key].menuID === 1) {
  //     payload[FieldsAuth[0].key] = data[FieldsAuth[0].key];
  //   } else {
  //     payload[FieldsAuth[0].key] = data[FieldsAuth[0].key].lstPermissionItem[0];
  //   }
  // } else {
  //   payload["lstMenu"] = null;
  // }

  return {type: types.SUCCESS_SIGN_IN, payload};
};

export const fFetchSignIn = params => {
  return dispatch => {
    dispatch({type: types.START_SIGN_IN});

    Services.authentication
      .signIn(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessSignIn(res.data, false));
        } else {
          return dispatch(fErrorSignIn(res.errorMessage));
        }
      })
      .catch(error => {
        return dispatch(fErrorSignIn(error));
      });
  };
};

//** Forgot password module */
export const resetForgotPassword = () => ({
  type: types.RESET_FORGOT_PASSWORD,
});

export const fErrorForgotPassword = error => ({
  type: types.ERROR_FORGOT_PASSWORD,
  payload: error,
});

export const fSuccessForgotPassword = () => {
  return {
    type: types.SUCCESS_FORGOT_PASSWORD,
  };
};

export const fFetchForgotPassword = params => {
  return dispatch => {
    dispatch({type: types.START_FORGOT_PASSWORD});

    Services.authentication
      .forgotPassword(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessForgotPassword());
        } else {
          return dispatch(
            fErrorForgotPassword(res.systemErrorMessage || res.errorMessage),
          );
        }
      })
      .catch(error => {
        dispatch(fErrorForgotPassword(error));
      });
  };
};

//** Reset password module */
export const resetResetPassword = () => ({
  type: types.RESET_RESET_PASSWORD,
});

export const fErrorCheckTokenPassword = error => ({
  type: types.ERROR_TOKEN_PASSWORD,
  payload: error,
});

export const fSuccessCheckTokenPassword = () => {
  return {
    type: types.SUCCESS_TOKEN_PASSWORD,
  };
};

export const fFetchCheckTokenPassword = params => {
  return dispatch => {
    dispatch({type: types.START_TOKEN_PASSWORD});

    Services.authentication
      .checkTokenPassword(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessCheckTokenPassword());
        } else {
          return dispatch(
            fErrorCheckTokenPassword(res.systemErrorMessage || res.errorMessage),
          );
        }
      })
      .catch(error => {
        dispatch(fErrorCheckTokenPassword(error));
      });
  };
};

export const fErrorResetPassword = error => ({
  type: types.ERROR_RESET_PASSWORD,
  payload: error,
});

export const fSuccessResetPassword = () => {
  return {
    type: types.SUCCESS_RESET_PASSWORD,
  };
};

export const fFetchResetPassword = params => {
  return dispatch => {
    dispatch({type: types.START_RESET_PASSWORD});

    Services.authentication
      .updateNewPassword(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessResetPassword());
        } else {
          return dispatch(
            fErrorResetPassword(res.systemErrorMessage || res.errorMessage),
          );
        }
      })
      .catch(error => {
        dispatch(fErrorResetPassword(error));
      });
  };
};

//** Refresh token module */
export const fFetchRefreshToken = (params, history) => {
  return dispatch => {
    dispatch({type: types.REFRESH_TOKEN});

    Services.authentication
      .refreshToken(params)
      .then(res => {
        if (!res.isError) {
          return dispatch(fSuccessSignIn(res.data, true));
        } else {
          localStorage.removeItem(Constants.LS_SIGN_IN);
          dispatch(fErrorSignIn("error"));
          dispatch(Actions.fSignout());
          return history.replace("/auth-login");
        }
      })
      .catch(error => {
        dispatch(fErrorSignIn(error));
        return history.replace("/auth-login");
      });
  };
};

