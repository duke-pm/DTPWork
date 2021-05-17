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
export const deletedMenuSettingsApi = data => {
	return request({
		method: 'DELETE',
		url: `${url}`,
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
