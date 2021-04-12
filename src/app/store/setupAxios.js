export default function setupAxios(axios, store) {
	const token = process.env.TOKEN;
	axios.interceptors.request.use(
		config => {
			const {
				auth: { authToken }
			} = store.getState();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		err => Promise.reject(err)
	);
}
