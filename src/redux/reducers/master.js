import * as types from "../actions/types";

export const initialState = {
  submittingGetAll: false,

  successGetAll: false,
  errorGetAll: false,
  errorHelperGetAll: "",

  region: [],
  department: [],
  employee: [],
  supplier: [],
  company: [],
  users: [],
  assetType: [],
  assetGroup: [],
  assetByUser: [],
  assetGroupDetail: [],
  projectStatus: [],
  projectSector: [],
  projectComponent: [],
  projectPriority: [],
  bkColor: [],
  bkReSource: [],
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case types.START_MASTER_GET_ALL:
      return {
        ...state,
        submittingGetAll: true,
        successGetAll: false,
        errorGetAll: false,
        errorHelperGetAll: "",
      };
    case types.ERROR_MASTER_GET_ALL:
      return {
        ...state,
        submittingGetAll: false,
        successGetAll: false,
        errorGetAll: true,
        errorHelperGetAll: payload,
      };
    case types.SUCCESS_MASTER_GET_ALL:
      return {
        ...state,
        submittingGetAll: false,
        successGetAll: true,
        errorGetAll: false,
        errorHelperGetAll: "",

        region: payload.region || state["region"],
        department: payload.department || state["department"],
        employee: payload.employees || state["employee"],
        supplier: payload.supplier || state["supplier"],
        company: payload.company || state["company"],
        users: payload.users || state["users"],
        assetType: payload.assetType || state["assetType"],
        assetGroup: payload.assetGroup || state["assetGroup"],
        assetByUser: payload.assetByUser || [],
        assetGroupDetail: payload.assetGroupDetail || state["assetGroupDetail"],
        projectStatus: payload.projectStatus || state["projectStatus"],
        projectSector: payload.projectSector || state["projectSector"],
        projectComponent: payload.projectComponent || state["projectComponent"],
        projectPriority: payload.projectPriority || state["projectPriority"],
        bkColor: payload.bkColor || state["bkColor"],
        bkReSource: payload.bkReSource || state["bkReSource"],
      };

    default:
      return state;
  };
};
