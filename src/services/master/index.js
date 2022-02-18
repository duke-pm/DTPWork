import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";

export default {
  getAll: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.ListType = params["ListType"];
      
      API.get(jwtServiceConfig.baseURL + Routes.MASTER_DATA.GET_ALL, tmpConfigs)
        .then(response => {
          console.log("FETCH MASTER DATA => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR MASTER DATA => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
