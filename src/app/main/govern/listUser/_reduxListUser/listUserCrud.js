import request from 'app/store/setupAxios';

export const fetchsListUser = params => {
	return request();
};
export const createdListUser = data => {
	return request({
		method: 'POST',
		data
	});
};
export const updatedListUser = data => {
	return request({
		method: 'POST',
		data
	});
};
