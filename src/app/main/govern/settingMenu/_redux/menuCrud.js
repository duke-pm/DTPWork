import { url } from 'app/main/assets/Possesion/_redux/posseionCruds';
import request from 'app/store/setupAxios';

export const fetchDataMenuApi = params => {
	return request.get();
};
export const createdMenuSettingsApi = data => {
	return request({
		method: 'POST',
		url,
		data
	});
};
export const updateMenuSettingsApi = data => {
	return request({
		method: 'PUT',
		url,
		data
	});
};
