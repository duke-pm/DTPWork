import * as types from "../actions/types";

const initialState = {
  submittingGetAll: false,
  submittingAssetsByUser: false,
  submittingUsersByLogin: false,
  submittingSubProjects: false,
  submittingSubTasks: false,

  successGetAll: false,
  errorGetAll: false,
  errorHelperGetAll: "",

  successAssetsByUser: false,
  errorAssetsByUser: false,
  errorHelperAssetsByUser: "",

  successUsersByLogin: false,
  errorUsersByLogin: false,
  errorHelperUsersByLogin: "",

  successSubProjects: false,
  errorSubProjects: false,
  errorHelperSubProjects: "",

  successSubTasks: false,
  errorSubTasks: false,
  errorHelperSubTasks: "",

  region: [],
  department: [],
  employee: [],
  supplier: [],
  company: [],
  bizlines: [],
  sales: [],
  userGroup: [],
  users: [],
  assetType: [],
  assetGroup: [],
  assetByUser: [],
  assetGroupDetail: [],
  projectStatus: [],
  projectSector: [],
  projectComponent: [],
  projectPriority: [],
  projectGrade: [],
  bkColor: [],
  bkReSource: [],
  bkResourceGroup: [],
  bkIcon: [],
  roles: [],
  typeGroups: [],
  titleApproval: [],
  userApproval: [],

  usersByLogin: [],
  subProjects: [],
  subTasks: [],
};

function MasterReducers(state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case types.RESET_MASTER_DATA:
      return {
        ...state,
        submittingGetAll: false,
        successGetAll: false,
        errorGetAll: false,
        errorHelperGetAll: "",

        submittingAssetsByUser: false,
        successAssetsByUser: false,
        errorAssetsByUser: false,
        errorHelperAssetsByUser: "",

        submittingUsersByLogin: false,
        successUsersByLogin: false,
        errorUsersByLogin: false,
        errorHelperUsersByLogin: "",

        submittingSubProjects: false,
        successSubProjects: false,
        errorSubProjects: false,
        errorHelperSubProjects: "",

        submittingSubTasks: false,
        successSubTasks: false,
        errorSubTasks: false,
        errorHelperSubTasks: "",
      };
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
        bizlines: payload.bizlines || state["bizlines"],
        sales: payload.sales || state["sales"],
        userGroup: payload.userGroup || state["userGroup"],
        users: payload.users || state["users"],
        assetType: payload.assetType || state["assetType"],
        assetGroup: payload.assetGroup || state["assetGroup"],
        assetByUser: payload.assetByUser || [],
        assetGroupDetail: payload.assetGroupDetail || state["assetGroupDetail"],
        projectStatus: payload.projectStatus || state["projectStatus"],
        projectSector: payload.projectSector || state["projectSector"],
        projectComponent: payload.projectComponent || state["projectComponent"],
        projectPriority: payload.projectPriority || state["projectPriority"],
        projectGrade: payload.projectGrade || state["projectGrade"],
        bkColor: payload.bkColor || state["bkColor"],
        bkReSource: payload.bkReSource || state["bkReSource"],
        bkResourceGroup: payload.bkResourceGroup || state["bkResourceGroup"],
        bkIcon: payload.bkIcon || state["bkIcon"],
        roles: payload.roles || state["roles"],
        typeGroups: payload.typeGroups || state["typeGroups"],
        titleApproval: payload.titleApproval || state["titleApproval"],
        userApproval: payload.userApproval || state["userApproval"],
      };

    case types.UPDATE_MASTER_SUPPLIER:
      return {
        ...state,
        supplier: [payload, ...state.supplier],
      };

    case types.START_ASSETS_BY_USER:
      return {
        ...state,
        submittingAssetsByUser: true,
        successAssetsByUser: false,
        errorAssetsByUser: false,
        errorHelperAssetsByUser: "",
      };
    case types.ERROR_ASSETS_BY_USER:
      return {
        ...state,
        submittingAssetsByUser: false,
        successAssetsByUser: false,
        errorAssetsByUser: true,
        errorHelperAssetsByUser: payload,
      };
    case types.SUCCESS_ASSETS_BY_USER:
      return {
        ...state,
        submittingAssetsByUser: false,
        successAssetsByUser: true,
        errorAssetsByUser: false,
        errorHelperAssetsByUser: "",

        assetByUser: payload || [],
      };

    case types.START_USERS_BY_LOGIN:
      return {
        ...state,
        submittingUsersByLogin: true,
        successUsersByLogin: false,
        errorUsersByLogin: false,
        errorHelperUsersByLogin: "",
      };
    case types.ERROR_USERS_BY_LOGIN:
      return {
        ...state,
        submittingUsersByLogin: false,
        successUsersByLogin: false,
        errorUsersByLogin: true,
        errorHelperUsersByLogin: payload,
      };
    case types.SUCCESS_USERS_BY_LOGIN:
      return {
        ...state,
        submittingUsersByLogin: false,
        successUsersByLogin: true,
        errorUsersByLogin: false,
        errorHelperUsersByLogin: "",

        usersByLogin: payload || state.usersByLogin,
      };

    case types.START_PROJECTS_SUB:
      return {
        ...state,
        submittingSubProjects: true,
        successSubProjects: false,
        errorSubProjects: false,
        errorHelperSubProjects: "",
      };
    case types.ERROR_PROJECTS_SUB:
      return {
        ...state,
        submittingSubProjects: false,
        successSubProjects: false,
        errorSubProjects: true,
        errorHelperSubProjects: payload,
      };
    case types.SUCCESS_PROJECTS_SUB:
      return {
        ...state,
        submittingSubProjects: false,
        successSubProjects: true,
        errorSubProjects: false,
        errorHelperSubProjects: "",

        subProjects: payload || state.subProjects,
      };

    case types.START_TASKS_SUB:
      return {
        ...state,
        submittingSubTasks: true,
        successSubTasks: false,
        errorSubTasks: false,
        errorHelperSubTasks: "",
      };
    case types.ERROR_TASKS_SUB:
      return {
        ...state,
        submittingSubTasks: false,
        successSubTasks: false,
        errorSubTasks: true,
        errorHelperSubTasks: payload,
      };
    case types.SUCCESS_TASKS_SUB:
      return {
        ...state,
        submittingSubTasks: false,
        successSubTasks: true,
        errorSubTasks: false,
        errorHelperSubTasks: "",

        subTasks: payload || state.subTasks,
      };

    default:
      return state;
  };
};

export default MasterReducers;
