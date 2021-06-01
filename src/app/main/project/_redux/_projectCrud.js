import request from 'app/store/setupAxios';

const url = '/api';
export const fetchsProject = params => {
	return request(`${url}`, { params });
};
export const projectModify = data => {
	return request({
		method: 'POST',
		data,
		url
	});
};
export const deleteProject = params => {
	return request.get(`${url}`, { params });
};
