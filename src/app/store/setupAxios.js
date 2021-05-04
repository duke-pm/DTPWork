import { getToken } from '@fuse/core/DtpConfig';

export default function setupAxios(axios, store) {
	const token = getToken();
	axios.interceptors.request.use(
		config => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		err => Promise.reject(err)
	);
}
