import request from '../../../../store/setupAxios';

const URL = '/api/AssetTrans/GetListAll';
const URL_UPDATE = '/api/AssetTrans/Update';
export const documentAssets = params => {
	return request.get(`${URL}`, { params });
};

export const updatedDocumentAssetsAllocation = data => {
	return request({
		method: 'POST',
		data,
		url: `${URL_UPDATE}`
	});
};

export const updatedDocumentAssetsRecovery = data => {
	return request({
		method: 'POST',
		data,
		url: `${URL_UPDATE}`
	});
};
