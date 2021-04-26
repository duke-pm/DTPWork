import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const urlFetch = '';

export const fetchDataConfirmApi = params => {
	return axios.get(`${baseUrl}/${urlFetch}`, { params });
};

export const approveToUserApi = data => {
	return axios({
		method: 'POST',
		url: urlFetch,
		data
	});
};
