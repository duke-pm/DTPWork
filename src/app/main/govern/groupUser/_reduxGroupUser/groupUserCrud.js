import request from 'app/store/setupAxios';

export const fetchsGroupUser = params => {
	return request();
};
export const createdGroupUser = data => {
	return request({
		method: 'POST',
		data
	});
};
export const updatedGroupUser = data => {
	return request({
		method: 'POST',
		data
	});
};
