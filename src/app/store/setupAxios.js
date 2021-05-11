import { getToken, removeCookies, removeLocalStorage } from '@fuse/core/DtpConfig';
import axios from 'axios';
import history from '@history';

const baseUrl = process.env.REACT_APP_API_URL;
const request = axios.create({
	baseURL: baseUrl
});

request.interceptors.request.use(
	config => {
		if (getToken()) {
			config.headers.Authorization = `Bearer ${getToken()}`;
		}
		return config;
	},
	err => Promise.reject(err)
);
request.interceptors.response.use(
	response => {
		return response;
	},
	err => {
		return new Promise((resolve, reject) => {
			if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
				// if you ever get an unauthorized response, logout the user
				removeCookies();
				removeLocalStorage();
				history.push({
					pathname: '/login'
				});
			}
			throw err;
		});
	}
);
export default request;
