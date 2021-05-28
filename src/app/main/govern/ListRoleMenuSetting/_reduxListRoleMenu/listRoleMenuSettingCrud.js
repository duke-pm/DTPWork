import request from 'app/store/setupAxios';

const url = 'api/Permission';
export const fetchsListRoleSetting = params => {
	return request(`${url}/GetList`, { params });
};
export const deletedListUser = params => {
	return request(`${url}/remove`, { params });
};
export const updateRoleSettings = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}/Modify`
	});
};
