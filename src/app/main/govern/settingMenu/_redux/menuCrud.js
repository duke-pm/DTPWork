import request from 'app/store/setupAxios';

const url = '/api/Menu';
export const fetchDataMenuApi = params => {
	return request.get(`${url}/GetList`, { params });
};
export const createdMenuSettingsApi = data => {
	return request({
		method: 'POST',
		url: `${url}/Modify`,
		data
	});
};
// export const updateMenuSettingsApi = data => {
// 	return request({
// 		method: 'POST',
// 		url: `${url}/Modify`,
// 		data
// 	});
// };
