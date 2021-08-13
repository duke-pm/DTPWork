import request from 'app/store/setupAxios';

const url = '/api';
export const fetchLines = params => {
	return request(`${url}`, { params });
};
export const lineModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}`
	});
};
export const deletedLine = params => {
	return request.get(`${url}/remove`, { params });
};
