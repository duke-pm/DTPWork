import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";
import {log} from "utils/Utils";

export default {
  /** Employee group */
  getEmployeeGroup: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.SortColumn = "";
      tmpConfigs.params.SortDirection = "asc";
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.EMPLOYEE_GROUP, tmpConfigs)
        .then(response => {
          log("FETCH EMPLOYEE GROUP => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR EMPLOYEE GROUP => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateEmployeeGroup: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_EMPLOYEE_GROUP, params)
        .then(response => {
          log("FETCH UPDATE EMPLOYEE GROUP => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE EMPLOYEE GROUP => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Employee */
  getEmployeeList: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.SortColumn = "";
      tmpConfigs.params.SortDirection = "asc";
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.EMPLOYEE_LIST, tmpConfigs)
        .then(response => {
          log("FETCH EMPLOYEE LIST => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR EMPLOYEE LIST => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateEmployee: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_EMPLOYEE, params)
        .then(response => {
          log("FETCH UPDATE EMPLOYEE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE EMPLOYEE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Menu */
  getMenuList: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.SortColumn = "";
      tmpConfigs.params.SortDirection = "asc";
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.MENU_LIST, tmpConfigs)
        .then(response => {
          log("FETCH MENU LIST => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR MENU LIST => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateMenu: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_MENU, params)
        .then(response => {
          log("FETCH UPDATE MENU => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE MENU => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Role */
  getRoleList: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.GroupID = params["GroupID"];
      tmpConfigs.params.UserID = params["UserID"];
      tmpConfigs.params.IsWebOrMobile = params["IsWebOrMobile"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.ROLE_LIST, tmpConfigs)
        .then(response => {
          log("FETCH ROLE LIST => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR ROLE LIST => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateRole: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_ROLE, params)
        .then(response => {
          log("FETCH UPDATE ROLE => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE ROLE => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Approved lines */
  getApprovedLines: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.APPROVED_LINES, tmpConfigs)
        .then(response => {
          log("FETCH APPROVED LINES => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR APPROVED LINES => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateApprovedLines: params => {
    return new Promise((resolve, reject) => {
      API.put(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_APPROVED_LINES, params)
        .then(response => {
          log("FETCH UPDATE APPROVED LINES => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE APPROVED LINES => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeApprovedLines: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.RoleID = params["RoleID"];

      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.REMOVE_APPROVED_LINES, tmpConfigs)
        .then(response => {
          log("FETCH REMOVE APPROVED LINES => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE APPROVED LINES => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },

  /** Approved levels */
  getApprovedLevels: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.APPROVED_LEVELS, tmpConfigs)
        .then(response => {
          log("FETCH APPROVED LEVELS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR APPROVED LEVELS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateApprovedLevels: params => {
    return new Promise((resolve, reject) => {
      API.put(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_APPROVED_LEVELS, params)
        .then(response => {
          log("FETCH UPDATE APPROVED LEVELS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UPDATE APPROVED LEVELS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeApprovedLevels: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.AbsID = params["AbsID"];
      tmpConfigs.params.Lang = params["Lang"];

      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.REMOVE_APPROVED_LEVELS, tmpConfigs)
        .then(response => {
          log("FETCH REMOVE APPROVED LEVELS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REMOVE APPROVED LEVELS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
