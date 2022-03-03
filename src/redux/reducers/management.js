import * as types from "../actions/types";

export const initialState = {
  submittingEmpGro: false,
  submittingCreateEmpGro: false,
  submittingUpdateEmpGro: false,

  successEmpGro: false,
  errorEmpGro: false,
  errorHelperEmpGro: "",

  successCreateEmpGro: false,
  errorCreateEmpGro: false,
  errorHelperCreateEmpGro: "",

  successUpdateEmpGro: false,
  errorUpdateEmpGro: false,
  errorHelperUpdateEmpGro: "",

  employeeGroup: [],
  numEmployeeGroup: 0,
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case types.RESET_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingEmpGro: false,
        successEmpGro: false,
        errorEmpGro: false,
        errorHelperEmpGro: "",

        submittingUpdateEmpGro: false,
        successUpdateEmpGro: false,
        errorUpdateEmpGro: false,
        errorHelperUpdateEmpGro: "",

      };
    
    /** List employee group */
    case types.START_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingEmpGro: true,
        successEmpGro: false,
        errorEmpGro: false,
        errorHelperEmpGro: "",
      };

    case types.ERROR_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingEmpGro: false,
        successEmpGro: false,
        errorEmpGro: true,
        errorHelperEmpGro: payload,
      };

    case types.SUCCESS_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingEmpGro: false,
        successEmpGro: true,
        errorEmpGro: false,
        errorHelperEmpGro: "",

        employeeGroup: payload.data,
        numEmployeeGroup: payload.count,
      };

    /** Create employee group */
    case types.START_CREATE_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingCreateEmpGro: true,
        successCreateEmpGro: false,
        errorCreateEmpGro: false,
        errorHelperCreateEmpGro: "",
      };

    case types.ERROR_CREATE_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingCreateEmpGro: false,
        successCreateEmpGro: false,
        errorCreateEmpGro: true,
        errorHelperCreateEmpGro: payload,
      };

    case types.SUCCESS_CREATE_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingCreateEmpGro: false,
        successCreateEmpGro: true,
        errorCreateEmpGro: false,
        errorHelperCreateEmpGro: "",
      };

    /** Update employee group */
    case types.START_UPDATE_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingUpdateEmpGro: true,
        successUpdateEmpGro: false,
        errorUpdateEmpGro: false,
        errorHelperUpdateEmpGro: "",
      };

    case types.ERROR_UPDATE_EMPLOYEE_GROUP:
      return {
        ...state,
        submittingUpdateEmpGro: false,
        successUpdateEmpGro: false,
        errorUpdateEmpGro: true,
        errorHelperUpdateEmpGro: payload,
      };

    case types.SUCCESS_UPDATE_EMPLOYEE_GROUP:
      let tmpEmployeeGroup = state.employeeGroup;
      let fIdxGroup = tmpEmployeeGroup.findIndex(f => f.groupID === payload.groupID);
      if (fIdxGroup !== -1) {
        tmpEmployeeGroup[fIdxGroup] = payload;
      } else {
        tmpEmployeeGroup.push(payload);
      }

      return {
        ...state,
        submittingUpdateEmpGro: false,
        successUpdateEmpGro: true,
        errorUpdateEmpGro: false,
        errorHelperUpdateEmpGro: "",

        employeeGroup: tmpEmployeeGroup,
      };

    default:
      return state;
  };
};
