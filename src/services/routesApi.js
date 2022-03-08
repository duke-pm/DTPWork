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
  // PROJECT_MANAGEMENT: {
  //   LIST_PROJECT: "/Project/GetList",
  //   LIST_TASK: "/Task/GetList",
  //   TASK_DETAIL: "/Task/GetByID",
  //   TASK_UPDATE: "/Task/UpdateTaskInfo",
  //   TASK_COMMENT: "/TaskActivity/Modify",
  //   TASK_WATCHER: "/TaskWatcher/Modify",
  //   PROJECT_OVERVIEW: "/Project/GetListOverview",
  // },
  // BOOKING: {
  //   LIST_BOOKING: "/TransBooking/GetList",
  //   ADD_BOOKING: "/TransBooking/Modify",
  //   UPDATE_BOOKING: "/TransBooking/Modify",
  //   REMOVE_BOOKING: "/TransBooking/Remove",
  //   BOOKING_DETAIL: "/TransBooking/GetByID",
  //   BOOKING_RESOURCE: "/TransBooking/GetListResource",
  // },
};

export default Routes;
