import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const url = 'api/ProvideRequest';

export const listProvideRequest = params => {
	return axios.get(`${baseUrl}/${url}/GetList`, { params });
};

export const updateTypeProviderRequest = data => {
	return axios({
		method: 'POST',
		url,
		data
	});
};
