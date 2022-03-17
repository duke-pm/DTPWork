const Routes = {
  AUTHENTICATION: {
    LOGIN: "/User/Login",
    REFRESH_TOKEN: "/User/RefreshToken",
    CHANGE_PASSWORD: "/User/ChangePassword",
    FORGOT_PASSWORD: "/User/ForgotPassword",
    UPDATE_PASSWORD: "/User/UpdateNewPassword",
    CHECK_TOKEN_PASSWORD: "/User/CheckToken",
  },
  MASTER_DATA: {
    GET_ALL: "/MasterData/GetDataForForm",
    GET_ASSETS_BY_USER: "/Assets/GetListByUser",
    GET_USERS_BY_LOGIN: "/User/GetListByUserLogin",
    GET_PROJECTS_FOR_SUB: "/Project/GetListProjectForSub",
    GET_TASKS_FOR_SUB: "/Task/GetListForSub",
  },
  MANAGEMENT: {
    EMPLOYEE_GROUP: "/UserGroup/GetList",
    UDPATE_EMPLOYEE_GROUP: "/UserGroup/Modify",

    EMPLOYEE_LIST: "/User/GetList",
    UDPATE_EMPLOYEE: "/User/Modify",

    MENU_LIST: "/Menu/GetList",
    UDPATE_MENU: "/Menu/Modify",

    ROLE_LIST: "/Permission/GetList",
    UDPATE_ROLE: "/Permission/Modify",

    APPROVED_LINES: "/RoleApproval/GetList",
    UDPATE_APPROVED_LINES: "/RoleApproval/Modify",
    REMOVE_APPROVED_LINES: "/RoleApproval/Remove",

    APPROVED_LEVELS: "/LevelApproval/GetList",
    UDPATE_APPROVED_LEVELS: "/LevelApproval/Modify",
    REMOVE_APPROVED_LEVELS: "/LevelApproval/Remove",
  },
  APPROVED: {
    LIST_ASSETS: "/Assets/GetList",
    HISTORY_ASSET: "/Assets/GetHistoryByID",
    DATA_EMPLOYEE: "/Assets/GetDataEmployee",
    CREATE_ASSETS: "/Assets/Create",
    UPDATE_ASSETS: "/Assets/Update",
    APPROVED_ASSETS: "/AssetTrans/ProcessAsset",
    RECALL_ASSETS: "/AssetTrans/ProcessAsset",
    REPAIR_ASSETS: "/AssetTrans/ProcessAsset",
    LIQUIDATION_ASSETS: "/AssetTrans/ProcessAsset",
    REUSE_ASSETS: "/AssetTrans/ProcessAsset",
    UPDATE_PROCESS: "/AssetTrans/Update",
    CREATE_SUPPLIER: "/Supplier/Modify",

    LIST_REQUEST: "/RQAsset/GetList",
    CREATE_REQUEST_ALLOW: "/RQAsset/CreateAllocation",
    CREATE_REQUEST_DAM_LOS: "/RQAsset/CreateHandling",
    APPROVED_REQUEST: "/RequestApprove/Approve",
    REJECT_REQUEST: "/RequestApprove/Approve",

    EXPORT_ASSETS: "/Assets/ExportAsset",
    EXPORT_APPROVED_ASSETS: "/RQAsset/ExportAllocation",
    EXPORT_RECALL_ASSETS: "/RQAsset/ExportRequestRecovery",
    EXPORT_REQUEST_ALLOW: "/RQAsset/ExportRequestAllocation",
    EXPORT_REQUEST_DAMAGE: "/RQAsset/ExportRequestDamage",
  },
  BOOKING: {
    LIST_BOOKING: "/TransBooking/GetList",
    UPDATE_BOOKING: "/TransBooking/Modify",
    REMOVE_BOOKING: "/TransBooking/Remove",
    BOOKING_RESOURCE: "/TransBooking/GetListResource",

    LIST_GROUP_RESOURCE: "/BKResourceGroup/GetList",
    UPDATE_GROUP_RESOURCE: "/BKResourceGroup/Modify",
    REMOVE_GROUP_RESOURCE: "/BKResourceGroup/Remove",
    LIST_RESOURCE: "/BKResource/GetList",
    UPDATE_RESOURCE: "/BKResource/Modify",
    REMOVE_RESOURCE: "/BKResource/Remove",
    
    // BOOKING_DETAIL: "/TransBooking/GetByID",
  },
  PROJECT: {
    LIST_PROJECT: "/Project/GetList",
    UPDATE_PROJECT: "/Project/Modify",
    REMOVE_PROJECT: "/Project/Delete",
    EXPORT_PROJECT: "/Project/ExportProjectDetail",

    LIST_TASK: "/Task/GetList",
    LIST_TASK_ALL: "/Task/GetListAll",
    UPDATE_TASK: "/Task/Modify",
    UPDATE_GANTT_TASK: "/Task/UpdateGrantt",
    REMOVE_TASK: "/Task/Delete",
    TASK_DETAILS: "/Task/GetByID",

    TASK_UPDATE: "/Task/UpdateTaskInfo",
    TASK_COMMENT: "/TaskActivity/Modify",
    TASK_WATCHER: "/TaskWatcher/Modify",
    PROJECT_OVERVIEW: "/Project/GetListOverview",
  },
  
};

export default Routes;
