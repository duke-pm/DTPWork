import request from '../../../../store/setupAxios';

const URL = '/api/AssetTrans/GetListAll';
export const documentAssets = params => {
	return request.get(`${URL}`, { params });
};
