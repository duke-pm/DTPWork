import jwtServiceConfig from "../jwtServiceConfig";
import Routes from "../routesApi";
import API from "../axios";
import {log} from "utils/Utils";

export default {
  signIn: params => {
    return new Promise((resolve, reject) => {
      API.post(jwtServiceConfig.baseURL + Routes.AUTHENTICATION.LOGIN, params)
        .then(response => {
          log("FETCH USER LOGIN => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR USER LOGIN => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  refreshToken: params => {
    return new Promise((resolve, reject) => {
      API.post(
        jwtServiceConfig.baseURL + Routes.AUTHENTICATION.REFRESH_TOKEN,
        params,
      )
        .then(response => {
          log("FETCH REFRESH TOKEN => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR REFRESH TOKEN => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  changePassword: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.AUTHENTICATION.CHANGE_PASSWORD,
        params,
      )
        .then(response => {
          log("FETCH CHANGE PASSWORD => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR CHANGE PASSWORD => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  updateNewPassword: params => {
    return new Promise((resolve, reject) => {
      API.put(
        jwtServiceConfig.baseURL + Routes.AUTHENTICATION.UPDATE_PASSWORD,
        params,
      )
        .then(response => {
          log("FETCH UDPATE PASSWORD => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR UDPATE PASSWORD => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  forgotPassword: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      if (params["Email"]) {
        tmpConfigs.params.Email = params["Email"];
      }
      if (params["Lang"]) {
        tmpConfigs.params.Lang = params["Lang"];
      }
      API.get(
        jwtServiceConfig.baseURL + Routes.AUTHENTICATION.FORGOT_PASSWORD,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH FORGOT PASSWORD => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR FORGOT PASSWORD => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
  checkTokenPassword: params => {
    return new Promise((resolve, reject) => {
      let tmpConfigs = {params: {}};
      if (params["Token"]) {
        tmpConfigs.params.Token = params["Token"];
      }
      if (params["Lang"]) {
        tmpConfigs.params.Lang = params["Lang"];
      }
      API.get(
        jwtServiceConfig.baseURL + Routes.AUTHENTICATION.CHECK_TOKEN_PASSWORD,
        tmpConfigs,
      )
        .then(response => {
          log("FETCH CHECK TOKEN PASSWORD => ", response);
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            reject(response.statusText);
          }
        })
        .catch(error => {
          log("ERROR CHECK TOKEN PASSWORD => ", error);
          reject(error.response ? error.response.data : error);
        });
    });
  },
};
