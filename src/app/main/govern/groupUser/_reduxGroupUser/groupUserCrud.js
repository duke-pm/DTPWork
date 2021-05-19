import request from 'app/store/setupAxios';

const url = '/api/UserGroup';

export const fetchsGroupUser = params => {
	return request(`${url}/GetList`, { params });
};
export const groupUserModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}/Modify`
	});
};
export const deletedGroupUser = params => {
	return request.get(`${url}/remove`, { params });
};
