import request from 'app/store/setupAxios';

const url = '/api/LevelApproval';
export const fetchLevels = params => {
	return request(`${url}/GetList`, { params });
};
export const levelModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}`
	});
};
export const deletedLevel = params => {
	return request.get(`${url}/remove`, { params });
};
