import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const urlRule = 'api/Assets/GetList';
export const fetchDataPossesion = params => {
	return axios.get(`${baseUrl}/${urlRule}`, { params });
};

export const createdDataPossesion = data => {
	return axios.post(`${baseUrl}/${urlRule}`, data);
};

export const updateDataPossesion = data => {
	return axios.put(`${baseUrl}/${urlRule}/`, data);
};
