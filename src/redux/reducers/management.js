import * as types from "../actions/types";

const initialState = {
  submittingEmpGro: false,
  submittingCreateEmpGro: false,
  submittingUpdateEmpGro: false,
  submittingEmp: false,
  submittingCreateEmp: false,
  submittingUpdateEmp: false,
  submittingMenu: false,
  submittingCreateMenu: false,
  submittingUpdateMenu: false,
  submittingRole: false,
  submittingUpdateRoleLocal: false,
  submittingUpdateRole: false,
  submittingApprovedLines: false,
  submittingCreateApprovedLines: false,
  submittingUpdateApprovedLines: false,
  submittingRemoveApprovedLines: false,
  submittingApprovedLevels: false,
  submittingCreateApprovedLevels: false,
  submittingUpdateApprovedLevels: false,
  submittingRemoveApprovedLevels: false,

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

  successRole: false,
  errorRole: false,
  errorHelperRole: "",

  successUpdateRole: false,
  errorUpdateRole: false,
  errorHelperUpdateRole: "",

  successApprovedLines: false,
  errorApprovedLines: false,
  errorHelperApprovedLines: "",

  successCreateApprovedLines: false,
  errorCreateApprovedLines: false,
  errorHelperCreateApprovedLines: "",

  successUpdateApprovedLines: false,
  errorUpdateApprovedLines: false,
  errorHelperUpdateApprovedLines: "",

  successRemoveApprovedLines: false,
  errorRemoveApprovedLines: false,
  errorHelperRemoveApprovedLines: "",

  successApprovedLevels: false,
  errorApprovedLevels: false,
  errorHelperApprovedLevels: "",

  successCreateApprovedLevels: false,
  errorCreateApprovedLevels: false,
  errorHelperCreateApprovedLevels: "",

  successUpdateApprovedLevels: false,
  errorUpdateApprovedLevels: false,
  errorHelperUpdateApprovedLevels: "",

  successRemoveApprovedLevels: false,
  errorRemoveApprovedLevels: false,
  errorHelperRemoveApprovedLevels: "",

  employeeGroup: [],
  numEmployeeGroup: 0,

  employee: [],
  numEmployee: 0,

  menu: [],
  numMenu: 0,

  role: [],

  approvedLines: [],
  numApprovedLines: 0,

  approvedLevels: [],
  numApprovedLevels: 0,
};

const findRole = (data, menuID, update) => {
  let tmpData = null, i = 0, tmp = null;
  for (i = 0; i < data.length; i++) {
    if (data[i].menuID === menuID) {
      tmp = data[i];
      tmp.isAccess = update.access;
      tmp.isRead = update.read;
      tmp.isWrite = update.write;
      data[i] = tmp;
      return data;
    }
    if (data[i].lstPermissionItem.length > 0) {
      tmpData = findRole(data[i].lstPermissionItem, menuID, update);
      if (tmpData) {
        data[i].lstPermissionItem = tmpData;
        return data;
      }
    }
  }
  return null;
};

function ManagementReducers(state = initialState, action = {}) {
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

    case types.RESET_ROLE:
        return {
          ...state,
          submittingRole: false,
          successRole: false,
          errorRole: false,
          errorHelperRole: "",
  
          submittingUpdateRole: false,
          successUpdateRole: false,
          errorUpdateRole: false,
          errorHelperUpdateRole: "",
        };
  
    case types.RESET_APPROVED_LINES:
      return {
        ...state,
        submittingApprovedLines: false,
        successApprovedLines: false,
        errorApprovedLines: false,
        errorHelperApprovedLines: "",

        submittingCreateApprovedLines: false,
        successCreateApprovedLines: false,
        errorCreateApprovedLines: false,
        errorHelperCreateApprovedLines: "",

        submittingUpdateApprovedLines: false,
        successUpdateApprovedLines: false,
        errorUpdateApprovedLines: false,
        errorHelperUpdateApprovedLines: "",

        submittingRemoveApprovedLines: false,
        successRemoveApprovedLines: false,
        errorRemoveApprovedLines: false,
        errorHelperRemoveApprovedLines: "",
      };

    case types.RESET_APPROVED_LEVELS:
      return {
        ...state,
        submittingApprovedLevels: false,
        successApprovedLevels: false,
        errorApprovedLevels: false,
        errorHelperApprovedLevels: "",

        submittingCreateApprovedLevels: false,
        successCreateApprovedLevels: false,
        errorCreateApprovedLevels: false,
        errorHelperCreateApprovedLevels: "",

        submittingUpdateApprovedLevels: false,
        successUpdateApprovedLevels: false,
        errorUpdateApprovedLevels: false,
        errorHelperUpdateApprovedLevels: "",

        submittingRemoveApprovedLevels: false,
        successRemoveApprovedLevels: false,
        errorRemoveApprovedLevels: false,
        errorHelperRemoveApprovedLevels: "",
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

    /** List role */
    case types.START_ROLE_LIST:
      return {
        ...state,
        submittingRole: true,
        successRole: false,
        errorRole: false,
        errorHelperRole: "",
      };

    case types.ERROR_ROLE_LIST:
      return {
        ...state,
        submittingRole: false,
        successRole: false,
        errorRole: true,
        errorHelperRole: payload,
      };

    case types.SUCCESS_ROLE_LIST:
      return {
        ...state,
        submittingRole: false,
        successRole: true,
        errorRole: false,
        errorHelperRole: "",

        role: payload,
      };

    /** Update role local */
    case types.UPDATE_ROLE_LOCAL:
      let tmpRoles = state.role;
      let tmpData = findRole(
        tmpRoles.lstPermissionItem[0].lstPermissionItem,
        payload.menuID,
        payload.update,
      );
      tmpRoles.lstPermissionItem[0].lstPermissionItem = tmpData;
      return {
        ...state,
        role: tmpRoles,
      };

    /** Update role */
    case types.START_UPDATE_ROLE:
      return {
        ...state,
        submittingUpdateRole: true,
        successUpdateRole: false,
        errorUpdateRole: false,
        errorHelperUpdateRole: "",
      };

    case types.ERROR_UPDATE_ROLE:
      return {
        ...state,
        submittingUpdateRole: false,
        successUpdateRole: false,
        errorUpdateRole: true,
        errorHelperUpdateRole: payload,
      };

    case types.SUCCESS_UPDATE_ROLE:
    return {
      ...state,
      submittingUpdateRole: false,
      successUpdateRole: true,
      errorUpdateRole: false,
      errorHelperUpdateRole: "",

      menu: payload,
    };

    /** List approved lines */
    case types.START_APPROVED_LINES:
      return {
        ...state,
        submittingApprovedLines: true,
        successApprovedLines: false,
        errorApprovedLines: false,
        errorHelperApprovedLines: "",
      };

    case types.ERROR_APPROVED_LINES:
      return {
        ...state,
        submittingApprovedLines: false,
        successApprovedLines: false,
        errorApprovedLines: true,
        errorHelperApprovedLines: payload,
      };

    case types.SUCCESS_APPROVED_LINES:
      return {
        ...state,
        submittingApprovedLines: false,
        successApprovedLines: true,
        errorApprovedLines: false,
        errorHelperApprovedLines: "",

        approvedLines: payload.data,
        numApprovedLines: payload.count,
      };

    /** Create approved lines */
    case types.START_CREATE_APPROVED_LINES:
      return {
        ...state,
        submittingCreateApprovedLines: true,
        successCreateApprovedLines: false,
        errorCreateApprovedLines: false,
        errorHelperCreateApprovedLines: "",
      };

    case types.ERROR_CREATE_APPROVED_LINES:
      return {
        ...state,
        submittingCreateApprovedLines: false,
        successCreateApprovedLines: false,
        errorCreateApprovedLines: true,
        errorHelperCreateApprovedLines: payload,
      };

    case types.SUCCESS_CREATE_APPROVED_LINES:
      return {
        ...state,
        submittingCreateApprovedLines: false,
        successCreateApprovedLines: true,
        errorCreateApprovedLines: false,
        errorHelperCreateApprovedLines: "",
      };

    /** Update approved lines */
    case types.START_UPDATE_APPROVED_LINES:
      return {
        ...state,
        submittingUpdateApprovedLines: true,
        successUpdateApprovedLines: false,
        errorUpdateApprovedLines: false,
        errorHelperUpdateApprovedLines: "",
      };

    case types.ERROR_UPDATE_APPROVED_LINES:
      return {
        ...state,
        submittingUpdateApprovedLines: false,
        successUpdateApprovedLines: false,
        errorUpdateApprovedLines: true,
        errorHelperUpdateApprovedLines: payload,
      };

    case types.SUCCESS_UPDATE_APPROVED_LINES:
      let tmpApprovedLines = state.approvedLines;
      let fIdxApprovedLines = tmpApprovedLines.findIndex(f => f.roleID === payload.roleID);
      if (fIdxApprovedLines !== -1) {
        tmpApprovedLines[fIdxApprovedLines] = payload;
      } else {
        tmpApprovedLines.push(payload);
      }

    return {
      ...state,
      submittingUpdateApprovedLines: false,
      successUpdateApprovedLines: true,
      errorUpdateApprovedLines: false,
      errorHelperUpdateApprovedLines: "",

      approvedLines: tmpApprovedLines,
    };

    /** Remove approved lines */
    case types.START_REMOVE_APPROVED_LINES:
      return {
        ...state,
        submittingRemoveApprovedLines: true,
        successRemoveApprovedLines: false,
        errorRemoveApprovedLines: false,
        errorHelperRemoveApprovedLines: "",
      };

    case types.ERROR_REMOVE_APPROVED_LINES:
      return {
        ...state,
        submittingRemoveApprovedLines: false,
        successRemoveApprovedLines: false,
        errorRemoveApprovedLines: true,
        errorHelperRemoveApprovedLines: payload,
      };

    case types.SUCCESS_REMOVE_APPROVED_LINES:
      let tmpAL = state.approvedLines,
        tmpNumAL = state.numApprovedLines;
      let fAL = tmpAL.findIndex(f => f.roleID === payload.roleID);
      if (fAL !== -1) {
        tmpAL.splice(fAL, 1);
        tmpNumAL -= 1;
      }

      return {
        ...state,
        submittingRemoveApprovedLines: false,
        successRemoveApprovedLines: true,
        errorRemoveApprovedLines: false,
        errorHelperRemoveApprovedLines: "",

        approvedLines: tmpAL,
        numApprovedLines: tmpNumAL,
      };

      /** List approved levels */
    case types.START_APPROVED_LEVELS:
      return {
        ...state,
        submittingApprovedLevels: true,
        successApprovedLevels: false,
        errorApprovedLevels: false,
        errorHelperApprovedLevels: "",
      };

    case types.ERROR_APPROVED_LEVELS:
      return {
        ...state,
        submittingApprovedLevels: false,
        successApprovedLevels: false,
        errorApprovedLevels: true,
        errorHelperApprovedLevels: payload,
      };

    case types.SUCCESS_APPROVED_LEVELS:
      return {
        ...state,
        submittingApprovedLevels: false,
        successApprovedLevels: true,
        errorApprovedLevels: false,
        errorHelperApprovedLevels: "",

        approvedLevels: payload.data,
        numApprovedLevels: payload.count,
      };

    /** Create approved levels */
    case types.START_CREATE_APPROVED_LEVELS:
      return {
        ...state,
        submittingCreateApprovedLevels: true,
        successCreateApprovedLevels: false,
        errorCreateApprovedLevels: false,
        errorHelperCreateApprovedLevels: "",
      };

    case types.ERROR_CREATE_APPROVED_LEVELS:
      return {
        ...state,
        submittingCreateApprovedLevels: false,
        successCreateApprovedLevels: false,
        errorCreateApprovedLevels: true,
        errorHelperCreateApprovedLevels: payload,
      };

    case types.SUCCESS_CREATE_APPROVED_LEVELS:
      return {
        ...state,
        submittingCreateApprovedLevels: false,
        successCreateApprovedLevels: true,
        errorCreateApprovedLevels: false,
        errorHelperCreateApprovedLevels: "",
      };

    /** Update approved levels */
    case types.START_UPDATE_APPROVED_LEVELS:
      return {
        ...state,
        submittingUpdateApprovedLevels: true,
        successUpdateApprovedLevels: false,
        errorUpdateApprovedLevels: false,
        errorHelperUpdateApprovedLevels: "",
      };

    case types.ERROR_UPDATE_APPROVED_LEVELS:
      return {
        ...state,
        submittingUpdateApprovedLevels: false,
        successUpdateApprovedLevels: false,
        errorUpdateApprovedLevels: true,
        errorHelperUpdateApprovedLevels: payload,
      };

    case types.SUCCESS_UPDATE_APPROVED_LEVELS:
      let tmpApprovedLevels = state.approvedLevels;
      let fIdxApprovedLevels= tmpApprovedLevels.findIndex(f => f.absID === payload[0].absID);
      if (fIdxApprovedLevels !== -1) {
        tmpApprovedLevels[fIdxApprovedLevels] = payload[0];
      } else {
        tmpApprovedLevels.push(payload[0]);
      }

    return {
      ...state,
      submittingUpdateApprovedLevels: false,
      successUpdateApprovedLevels: true,
      errorUpdateApprovedLevels: false,
      errorHelperUpdateApprovedLevels: "",

      approvedLevels: tmpApprovedLevels,
    };

    /** Remove approved levels */
    case types.START_REMOVE_APPROVED_LEVELS:
      return {
        ...state,
        submittingRemoveApprovedLevels: true,
        successRemoveApprovedLevels: false,
        errorRemoveApprovedLevels: false,
        errorHelperRemoveApprovedLevels: "",
      };

    case types.ERROR_REMOVE_APPROVED_LEVELS:
      return {
        ...state,
        submittingRemoveApprovedLevels: false,
        successRemoveApprovedLevels: false,
        errorRemoveApprovedLevels: true,
        errorHelperRemoveApprovedLevels: payload,
      };

    case types.SUCCESS_REMOVE_APPROVED_LEVELS:
      let tmpALV = state.approvedLevels,
        tmpNumALV = state.numApprovedLevels;
      let fALV = tmpALV.findIndex(f => f.absID === payload.absID);
      if (fALV !== -1) {
        tmpALV.splice(fALV, 1);
        tmpNumALV -= 1;
      }

      return {
        ...state,
        submittingRemoveApprovedLevels: false,
        successRemoveApprovedLevels: true,
        errorRemoveApprovedLevels: false,
        errorHelperRemoveApprovedLevels: "",

        approvedLevels: tmpALV,
        numApprovedLevels: tmpNumALV,
      };

    default:
      return state;
  };
};

export default ManagementReducers;
