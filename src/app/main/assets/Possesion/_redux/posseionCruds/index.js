import request from 'app/store/setupAxios';
import axios from 'axios';

export const url = `/api/Assets/Create`;
export const urlUpdate = `/api/Assets/Update`;
const urlRule = '/api/Assets/GetList';
const urlInformation = '/api/MasterData/GetDataForForm';
const UrlType = `/api/AssetTrans/ProcessAsset`;
const UrlHistory = `/api/Assets/GetHistoryByID`;
const urlSupplier = `/api/Supplier/Modify`;
const urlExportExcel = `/api/Assets/ExportExcel`;
const urlUpdateEmployee = `/api/Assets/GetDataEmployee`;
export const fetchDataPossesion = params => {
	return request.get(`${urlRule}`, { params });
};

export const createdDataPossesion = data => {
	return request({
		method: 'POST',
		url,
		data
	});
};

export const updateDataPossesion = data => {
	return request({
		method: 'PUT',
		url: urlUpdate,
		data
	});
};
export const updateTypeAsset = data => {
	return request({
		method: 'POST',
		url: UrlType,
		data
	});
};
export const requestAsset = data => {
	return axios({
		method: 'POST',
		url: UrlType,
		data
	});
};
export const getInformationCompany = params => {
	return request.get(`${urlInformation}`, { params });
};
export const getAssetHistory = params => {
	return request.get(`${UrlHistory}`, { params });
};
export const addNewsSupplier = data => {
	return request({
		method: 'POST',
		url: urlSupplier,
		data
	});
};

export const exportExcel = paramsReq => {
	return request({
		method: 'POST',
		url: urlExportExcel,
		responseType: 'Blob',
		params: paramsReq
	});
};
export const getDataEmployee = () => {
	return request.get(`${urlUpdateEmployee}`);
};
