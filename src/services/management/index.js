import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";

export default {
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
          console.log("FETCH EMPLOYEE GROUP => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR EMPLOYEE GROUP => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateEmployeeGroup: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.MANAGEMENT.UDPATE_EMPLOYEE_GROUP, params)
        .then(response => {
          console.log("FETCH UPDATE EMPLOYEE GROUP => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR UPDATE EMPLOYEE GROUP => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  removeEmployeeGroup: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.GroupID = params["GroupID"];
      tmpConfigs.params.Lang = params["Lang"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MANAGEMENT.REMOVE_EMPLOYEE_GROUP, tmpConfigs)
        .then(response => {
          console.log("FETCH REMOVE EMPLOYEE GROUP => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR REMOVE EMPLOYEE GROUP => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
