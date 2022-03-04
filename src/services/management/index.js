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
};
