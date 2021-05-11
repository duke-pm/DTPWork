import request from 'app/store/setupAxios';

const url = 'api/RQAsset/GetList';
const UrlRequestUser = `/api/RQAsset/CreateAllocation`;
export const urlReport = `/api/RQAsset/CreateHandling`;
const urlInformation = '/api/MasterData/GetDataForForm';
const urlAssetsUser = `/api/Assets/GetListByUser`;
const urlApprove = `/api/RequestApprove/Approve`;

export const listProvideRequest = params => {
	return request.get(`${url}`, { params });
};

export const updateTypeProviderRequest = data => {
	return request({
		method: 'POST',
		url,
		data
	});
};
export const getInformationCompany = params => {
	return request.get(`${urlInformation}`, { params });
};
export const getAssetsUser = params => {
	return request.get(`${urlAssetsUser}`, { params });
};
export const requestFromUser = data => {
	return request({
		method: 'POST',
		url: UrlRequestUser,
		data
	});
};
export const RequestApprove = data => {
	return request({
		method: 'POST',
		url: urlApprove,
		data
	});
};
export const reportFromUser = data => {
	return request({
		method: 'POST',
		url: urlReport,
		data
	});
};
