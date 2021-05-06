import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
/* eslint-disable camelcase */
const baseUrl = process.env.REACT_APP_API_URL;
const url = 'api/User/Login';
const urlRefreshToken = 'api/User/RefreshToken';

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						console.log('logout');
						this.emit('onAutoLogout', 'Token không khả dụng');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		const data = {
			Username: email,
			Password: password
		};
		return new Promise((resolve, reject) => {
			axios({
				method: 'POST',
				url: `${baseUrl}/${url}`,
				data
			}).then(response => {
				if (response.data.data) {
					this.setCookie(
						response.data.data.access_token,
						response.data.data.userName,
						response.data.data.refresh_token,
						response.data.data.expires_in
					);
					this.setSession(response.data.data);
					resolve(response.data.data);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithToken = refresToken => {
		const dataReq = {
			RefreshToken: refresToken,
			Lang: 'vi'
		};
		return new Promise((resolve, reject) => {
			axios({
				method: 'POST',
				url: `${baseUrl}/${urlRefreshToken}`,
				data: dataReq
			})
				.then(response => {
					if (response.data.data) {
						this.setCookie(
							response.data.data.access_token,
							response.data.data.userName,
							response.data.data.refresh_token,
							response.data.data.expires_in
						);
						this.setSession(response.data.data);
						resolve(response.data.data);
					} else {
						reject(response.data.error);
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	setSession = data => {
		if (data) {
			localStorage.setItem('data_user', JSON.stringify(data));
		} else {
			localStorage.removeItem('data_user');
		}
	};

	setCookie = (access_token, role, refresh_token, expires_in) => {
		if (access_token) {
			console.log(access_token);
			Cookies.set('token', access_token, { expires: 20 });
			Cookies.set('role', role, { expires: 20 });
			Cookies.set('refresh_token', refresh_token, { expires: expires_in });
		} else {
			Cookies.remove('token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
