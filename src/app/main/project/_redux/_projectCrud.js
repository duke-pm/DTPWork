import request from 'app/store/setupAxios';

const url = '/api/Project';
const fetchOwner = '/api/User/GetListByUserLogin';
export const fetchsProject = params => {
	return request(`${url}/GetList`, { params });
};
export const projectModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}/Modify`
	});
};
export const deleteProject = params => {
	return request.get(`${url}`, { params });
};
export const getOwner = () => {
	return request.get(`${fetchOwner}`);
};
export const getProjectSub = () => {
	return request.get(`${url}/GetListProjectForSub`);
};
