import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const url = 'api/Assets';
const urlRule = 'api/Assets/GetList';
const urlInformation = 'api/MasterData/GetDataForForm';
export const fetchDataPossesion = params => {
	return axios.get(`${baseUrl}/${urlRule}`, { params });
};

export const createdDataPossesion = data => {
	return axios.post(`${baseUrl}/${url}/Create`, data);
};

export const updateDataPossesion = data => {
	return axios.put(`${baseUrl}/${url}/Update`, data);
};

export const getInformationCompany = params => {
	return axios.get(`${baseUrl}/${urlInformation}`, { params });
};
