import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
export const url = `${baseUrl}/api/Assets/Create`;
export const urlUpdate = `${baseUrl}/api/Assets/Update`;
export const urlGet = `${baseUrl}/api/Assets/GetList`;
const urlRule = 'api/Assets/GetList';
const urlInformation = 'api/MasterData/GetDataForForm';
export const fetchDataPossesion = params => {
	return axios.get(`${baseUrl}/${urlRule}`, { params });
};

export const createdDataPossesion = data => {
	return axios({
		method: 'POST',
		url,
		data
	});
};

export const updateDataPossesion = data => {
	return axios({
		method: 'PUT',
		url: urlUpdate,
		data
	});
};

export const getInformationCompany = params => {
	return axios.get(`${baseUrl}/${urlInformation}`, { params });
};
