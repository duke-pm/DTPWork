import request from 'app/store/setupAxios';

const url = '/api/RoleApproval';
export const fetchLines = params => {
	return request(`${url}/GetList`, { params });
};
export const lineModify = data => {
	return request({
		method: 'PUT',
		data,
		url: `${url}/Modify`
	});
};
export const deletedLine = params => {
	return request.get(`${url}/Remove`, { params });
};
