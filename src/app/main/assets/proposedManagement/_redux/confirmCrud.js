import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const url = 'api/RQAsset/GetList';
const urlInformation = 'api/MasterData/GetDataForForm';
const UrlRequestUser = `${baseUrl}/api/RQAsset/CreateAllocation`;
const urlAssetsUser = `api/Assets/GetListByUser`;
const urlApprove = `${baseUrl}/api/RequestApprove/Approve`;
export const urlReport = `${baseUrl}/api/RQAsset/CreateHandling`;

export const listProvideRequest = params => {
	return axios.get(`${baseUrl}/${url}`, { params });
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
export const getAssetsUser = params => {
	return axios.get(`${baseUrl}/${urlAssetsUser}`, { params });
};
export const requestFromUser = data => {
	return axios({
		method: 'POST',
		url: UrlRequestUser,
		data
	});
};
export const RequestApprove = data => {
	return axios({
		method: 'POST',
		url: urlApprove,
		data
	});
};
export const reportFromUser = data => {
	return axios({
		method: 'POST',
		url: urlReport,
		data
	});
};
