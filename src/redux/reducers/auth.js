import * as types from "../actions/types";

export const initialState = {
  submitting: false,
  submittingChangePass: false,
  submittingForgotPass: false,
  submittingUpdatePass: false,
  submittingCheckTokenPass: false,
  submittingRefresh: false,

  successRefresh: false,
  errorRefresh: false,

  successSignIn: false,
  errorSignIn: false,
  errorHelperSignIn: "",

  successChangePass: false,
  errorChangePass: false,
  errorHelperChangePass: "",

  successForgotPass: false,
  errorForgotPass: false,
  errorHelperForgotPass: "",

  successUpdatePass: false,
  errorUpdatePass: false,
  errorHelperUpdatePass: "",

  successCheckTokenPass: false,
  errorCheckTokenPass: false,
  errorHelperCheckTokenPass: "",

  data: {
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    userName: null,
    userID: null,
    userId: null,
    empCode: null,
    fullName: null,
    regionCode: null,
    deptCode: null,
    jobTitle: null,
    groupID: null,
    lstMenu: null,
  },
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case types.SIGN_OUT:
      return {
        ...state,
        submitting: false,
        successSignIn: false,
        errorSignIn: false,
        errorHelperSignIn: "",
        data: {
          ...state.data,
          accessToken: null,
          tokenType: null,
          refreshToken: null,
          userName: null,
          userID: null,
          userId: null,
          empCode: null,
          fullName: null,
          regionCode: null,
          deptCode: null,
          jobTitle: null,
          groupID: null,
          lstMenu: null,
        }
      };

    case types.START_REFRESH_TOKEN:
      return {
        ...state,
        submittingRefresh: true,
        successRefresh: false,
        errorRefresh: false,
      };
    case types.SUCCESS_REFRESH_TOKEN:
      return {
        ...state,
        submittingRefresh: false,
        successRefresh: true,
        errorRefresh: false,
      };
    case types.ERROR_REFRESH_TOKEN:
      return {
        ...state,
        submittingRefresh: false,
        successRefresh: false,
        errorRefresh: true,
      };

    case types.START_SIGN_IN:
      return {
        ...state,
        submitting: false,
        successSignIn: false,
        errorSignIn: false,
        errorHelperSignIn: "",
      };
    case types.SUCCESS_SIGN_IN:
      return {
        ...state,
        submitting: false,
        successSignIn: true,
        errorSignIn: false,
        errorHelperSignIn: "",
        data: {
          ...state.data,
          accessToken: payload.accessToken,
          tokenType: payload.tokenType,
          refreshToken: payload.refreshToken,
          userName: payload.userName,
          userID: payload.userID,
          userId: payload.userId,
          empCode: payload.empCode,
          fullName: payload.fullName,
          regionCode: payload.regionCode,
          deptCode: payload.deptCode,
          jobTitle: payload.jobTitle,
          groupID: payload.groupID,
          lstMenu: payload.lstMenu || state.data.lstMenu,
        }
      };
    case types.ERROR_SIGN_IN:
      return {
        ...state,
        submitting: false,
        successSignIn: false,
        errorSignIn: true,
        errorHelperSignIn: payload,
      };

    case types.RESET_FORGOT_PASSWORD:
      return {
        ...state,
        submittingForgotPass: false,
        successForgotPass: false,
        errorForgotPass: false,
        errorHelperForgotPass: "",
      };
    case types.START_FORGOT_PASSWORD:
      return {
        ...state,
        submittingForgotPass: true,
        successForgotPass: false,
        errorForgotPass: false,
        errorHelperForgotPass: "",
      };
    case types.SUCCESS_FORGOT_PASSWORD:
      return {
        ...state,
        submittingForgotPass: false,
        successForgotPass: true,
        errorForgotPass: false,
        errorHelperForgotPass: "",
      };
    case types.ERROR_FORGOT_PASSWORD:
      return {
        ...state,
        submittingForgotPass: false,
        successForgotPass: false,
        errorForgotPass: true,
        errorHelperForgotPass: payload,
      };

    case types.RESET_RESET_PASSWORD:
      return {
        ...state,
        submittingCheckTokenPass: false,
        successCheckTokenPass: false,
        errorCheckTokenPass: false,
        errorHelperCheckTokenPass: "",
        submittingUpdatePass: false,
        successUpdatePass: false,
        errorUpdatePass: false,
        errorHelperUpdatePass: ""
      };
    case types.START_TOKEN_PASSWORD:
      return {
        ...state,
        submittingCheckTokenPass: true,
        successCheckTokenPass: false,
        errorCheckTokenPass: false,
        errorHelperCheckTokenPass: "",
      };
    case types.SUCCESS_TOKEN_PASSWORD:
      return {
        ...state,
        submittingCheckTokenPass: false,
        successCheckTokenPass: true,
        errorCheckTokenPass: false,
        errorHelperCheckTokenPass: "",
      };
    case types.ERROR_TOKEN_PASSWORD:
      return {
        ...state,
        submittingCheckTokenPass: false,
        successCheckTokenPass: false,
        errorCheckTokenPass: true,
        errorHelperCheckTokenPass: payload,
      };
    case types.START_RESET_PASSWORD:
      return {
        ...state,
        submittingUpdatePass: true,
        successUpdatePass: false,
        errorUpdatePass: false,
        errorHelperUpdatePass: "",
      };
    case types.SUCCESS_RESET_PASSWORD:
      return {
        ...state,
        submittingUpdatePass: false,
        successUpdatePass: true,
        errorUpdatePass: false,
        errorHelperUpdatePass: "",
      };
    case types.ERROR_RESET_PASSWORD:
      return {
        ...state,
        submittingUpdatePass: false,
        successUpdatePass: false,
        errorUpdatePass: true,
        errorHelperUpdatePass: payload,
      };
    

    default:
      return state;
  }
}