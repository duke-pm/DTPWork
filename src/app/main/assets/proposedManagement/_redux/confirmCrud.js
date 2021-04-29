import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const url = 'api/ProvideRequest';
const urlInformation = 'api/MasterData/GetDataForForm';
const UrlRequestUser = `${baseUrl}/api/ProvideRequest/Create`;

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
export const getInformationCompany = params => {
	return axios.get(`${baseUrl}/${urlInformation}`, { params });
};
export const requestFromUser = data => {
	return axios({
		method: 'POST',
		url: UrlRequestUser,
		data
	});
};
