import request from 'app/store/setupAxios';

const url = '/api/Project';
const urlDetail = '/api/Task';
const fetchOwner = '/api/User/GetListByUserLogin';
export const fetchsProject = params => {
	return request(`${url}/GetList`, { params });
};
export const deleteProject = params => {
	return request(`${url}/Delete`, { params });
};

export const projectModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${url}/Modify`
	});
};
export const taskModify = data => {
	return request({
		method: 'POST',
		data,
		url: `${urlDetail}/Modify`
	});
};
export const addTaskActivity = data => {
	return request({
		method: 'POST',
		url: '/api/TaskActivity/Modify',
		data
	});
};
export const addTaskWatch = data => {
	return request({
		method: 'POST',
		url: '/api/TaskWatcher/Modify',
		data
	});
};
export const updateStatusTask = params => {
	// return request(`${urlDetail}/UpdateTaskInfo`, { params });
	return request({
		method: 'PUT',
		url: `${urlDetail}/UpdateTaskInfo`,
		data: params
	});
};
export const getTaskViewDetail = params => {
	return request(`${urlDetail}/GetByID`, { params });
};
export const fetchProjectDetail = params => {
	return request(`${urlDetail}/GetList`, { params });
};
export const getOwner = () => {
	return request.get(`${fetchOwner}`);
};
export const getProjectSub = () => {
	return request.get(`${url}/GetListProjectForSub`);
};
export const getTaskSub = params => {
	return request.get(`${urlDetail}/GetListForSub`, { params });
};
export const getTaskDetailAll = params => {
	return request.get(`${urlDetail}/GetListAll`, { params });
};
