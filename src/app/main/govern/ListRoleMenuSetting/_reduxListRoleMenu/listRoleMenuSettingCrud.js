import request from 'app/store/setupAxios';

const url = '/api/User';
export const fetchsListUser = params => {
	return request(`${url}/GetList`, { params });
};
export const deletedListUser = params => {
	return request(`${url}/remove`, { params });
};
export const createdListUser = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}/Modify`
	});
};
