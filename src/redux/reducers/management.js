import * as types from "../actions/types";

export const initialState = {
  submittingEmpGro: false,
  submittingCreateEmpGro: false,
  submittingUpdateEmpGro: false,
  submittingEmp: false,
  submittingCreateEmp: false,
  submittingUpdateEmp: false,
  submittingMenu: false,
  submittingCreateMenu: false,
  submittingUpdateMenu: false,

  successEmpGro: false,
  errorEmpGro: false,
  errorHelperEmpGro: "",

  successCreateEmpGro: false,
  errorCreateEmpGro: false,
  errorHelperCreateEmpGro: "",

  successUpdateEmpGro: false,
  errorUpdateEmpGro: false,
  errorHelperUpdateEmpGro: "",

  successEmp: false,
  errorEmp: false,
  errorHelperEmp: "",

  successCreateEmp: false,
  errorCreateEmp: false,
  errorHelperCreateEmp: "",

  successUpdateEmp: false,
  errorUpdateEmp: false,
  errorHelperUpdateEmp: "",

  successMenu: false,
  errorMenu: false,
  errorHelperMenu: "",

  successCreateMenu: false,
  errorCreateMenu: false,
  errorHelperCreateMenu: "",

  successUpdateMenu: false,
  errorUpdateMenu: false,
  errorHelperUpdateMenu: "",

  employeeGroup: [],
  numEmployeeGroup: 0,

  employee: [],
  numEmployee: 0,

  menu: [],
  numMenu: 0,
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

        submittingCreateEmpGro: false,
        successCreateEmpGro: false,
        errorCreateEmpGro: false,
        errorHelperCreateEmpGro: "",

        submittingUpdateEmpGro: false,
        successUpdateEmpGro: false,
        errorUpdateEmpGro: false,
        errorHelperUpdateEmpGro: "",

      };

    case types.RESET_EMPLOYEE:
      return {
        ...state,
        submittingEmp: false,
        successEmp: false,
        errorEmp: false,
        errorHelperEmp: "",

        submittingCreateEmp: false,
        successCreateEmp: false,
        errorCreateEmp: false,
        errorHelperCreateEmp: "",

        submittingUpdateEmp: false,
        successUpdateEmp: false,
        errorUpdateEmp: false,
        errorHelperUpdateEmp: "",

      };
    
    case types.RESET_MENU:
      return {
        ...state,
        submittingMenu: false,
        successMenu: false,
        errorMenu: false,
        errorHelperMenu: "",

        submittingCreateMenu: false,
        successCreateMenu: false,
        errorCreateMenu: false,
        errorHelperCreateMenu: "",

        submittingUpdateMenu: false,
        successUpdateMenu: false,
        errorUpdateMenu: false,
        errorHelperUpdateMenu: "",

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

    /** List employee */
    case types.START_EMPLOYEE_LIST:
      return {
        ...state,
        submittingEmp: true,
        successEmp: false,
        errorEmp: false,
        errorHelperEmp: "",
      };

    case types.ERROR_EMPLOYEE_LIST:
      return {
        ...state,
        submittingEmp: false,
        successEmp: false,
        errorEmp: true,
        errorHelperEmp: payload,
      };

    case types.SUCCESS_EMPLOYEE_LIST:
      return {
        ...state,
        submittingEmp: false,
        successEmp: true,
        errorEmp: false,
        errorHelperEmp: "",

        employee: payload.data,
        numEmployee: payload.count,
      };

    /** Create employee */
    case types.START_CREATE_EMPLOYEE:
      return {
        ...state,
        submittingCreateEmp: true,
        successCreateEmp: false,
        errorCreateEmp: false,
        errorHelperCreateEmp: "",
      };

    case types.ERROR_CREATE_EMPLOYEE:
      return {
        ...state,
        submittingCreateEmp: false,
        successCreateEmp: false,
        errorCreateEmp: true,
        errorHelperCreateEmp: payload,
      };

    case types.SUCCESS_CREATE_EMPLOYEE:
      return {
        ...state,
        submittingCreateEmp: false,
        successCreateEmp: true,
        errorCreateEmp: false,
        errorHelperCreateEmp: "",
      };

    /** Update employee */
    case types.START_UPDATE_EMPLOYEE:
      return {
        ...state,
        submittingUpdateEmp: true,
        successUpdateEmp: false,
        errorUpdateEmp: false,
        errorHelperUpdateEmp: "",
      };

    case types.ERROR_UPDATE_EMPLOYEE:
      return {
        ...state,
        submittingUpdateEmp: false,
        successUpdateEmp: false,
        errorUpdateEmp: true,
        errorHelperUpdateEmp: payload,
      };

    case types.SUCCESS_UPDATE_EMPLOYEE:
      let tmpEmployee = state.employee;
      let fIdxEmp = tmpEmployee.findIndex(f => f.userID === payload.userID);
      if (fIdxEmp !== -1) {
        tmpEmployee[fIdxEmp] = payload;
      } else {
        tmpEmployee.push(payload);
      }

    return {
      ...state,
      submittingUpdateEmp: false,
      successUpdateEmp: true,
      errorUpdateEmp: false,
      errorHelperUpdateEmp: "",

      employee: tmpEmployee,
    };

    /** List menu */
    case types.START_MENU_LIST:
      return {
        ...state,
        submittingMenu: true,
        successMenu: false,
        errorMenu: false,
        errorHelperMenu: "",
      };

    case types.ERROR_MENU_LIST:
      return {
        ...state,
        submittingMenu: false,
        successMenu: false,
        errorMenu: true,
        errorHelperMenu: payload,
      };

    case types.SUCCESS_MENU_LIST:
      return {
        ...state,
        submittingMenu: false,
        successMenu: true,
        errorMenu: false,
        errorHelperMenu: "",

        menu: payload.data,
        numMenu: payload.count,
      };

    /** Create menu */
    case types.START_CREATE_MENU:
      return {
        ...state,
        submittingCreateMenu: true,
        successCreateMenu: false,
        errorCreateMenu: false,
        errorHelperCreateMenu: "",
      };

    case types.ERROR_CREATE_MENU:
      return {
        ...state,
        submittingCreateMenu: false,
        successCreateMenu: false,
        errorCreateMenu: true,
        errorHelperCreateMenu: payload,
      };

    case types.SUCCESS_CREATE_MENU:
      return {
        ...state,
        submittingCreateMenu: false,
        successCreateMenu: true,
        errorCreateMenu: false,
        errorHelperCreateMenu: "",
      };

    /** Update menu */
    case types.START_UPDATE_MENU:
      return {
        ...state,
        submittingUpdateMenu: true,
        successUpdateMenu: false,
        errorUpdateMenu: false,
        errorHelperUpdateMenu: "",
      };

    case types.ERROR_UPDATE_MENU:
      return {
        ...state,
        submittingUpdateMenu: false,
        successUpdateMenu: false,
        errorUpdateMenu: true,
        errorHelperUpdateMenu: payload,
      };

    case types.SUCCESS_UPDATE_MENU:
      let tmpMenu = state.menu;
      let fIdxMenu = tmpMenu.findIndex(f => f.menuID === payload.menuID);
      if (fIdxMenu !== -1) {
        tmpMenu[fIdxMenu] = payload;
      } else {
        tmpMenu.push(payload);
      }

    return {
      ...state,
      submittingUpdateMenu: false,
      successUpdateMenu: true,
      errorUpdateMenu: false,
      errorHelperUpdateMenu: "",

      menu: tmpMenu,
    };


    default:
      return state;
  };
};
