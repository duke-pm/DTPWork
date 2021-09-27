import request from 'app/store/setupAxios';

const API = 'api/BKResourceGroup';

export const fetchResouceBookingGroup = params => {
	return request(`${API}/GetList`, { params });
};

export const resourceBookingGroupModify = data => {
	return request({
		method: 'PUT',
		data,
		url: `${API}/Modify`
	});
};

export const removeResourceGroup = params => {
	return request(`${API}/Remove`, { params });
};
