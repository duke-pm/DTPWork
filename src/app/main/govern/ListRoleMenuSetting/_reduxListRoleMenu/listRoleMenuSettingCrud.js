import request from 'app/store/setupAxios';

const url = 'api/Permission/GetList';
export const fetchsListRoleSetting = params => {
	return request(`${url}`, { params });
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
