import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const urlMembership = '';

export const fetchDataMembership = params => {
	return axios.get(`${baseUrl}/${urlMembership}`, { params });
};
