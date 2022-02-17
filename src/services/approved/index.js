import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";

export default {
  listAssets: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      tmpConfigs.params.StatusID = params["StatusID"];
      tmpConfigs.params.PageSize = params["PageSize"];
      tmpConfigs.params.PageNum = params["PageNum"];
      tmpConfigs.params.Search = params["Search"];
      tmpConfigs.params.SortColumn = "";
      tmpConfigs.params.SortDirection = "desc";

      API.get(jwtServiceConfig.baseURL + Routes.APPROVED.LIST_ASSETS, tmpConfigs)
        .then(response => {
          console.log("FETCH LIST ASSETS => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          console.log("ERROR LIST ASSETS => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};