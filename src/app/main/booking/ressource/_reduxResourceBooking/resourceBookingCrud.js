import request from 'app/store/setupAxios';

const API = 'api/BKResource';

export const fetchResouceBooking = params => {
	return request(`${API}/GetList`, { params });
};

export const resourceBookingModify = data => {
	return request({
		method: 'PUT',
		data,
		url: `${API}/Modify`
	});
};

export const removeResource = params => {
	return request(`${API}/Remove`, { params });
};
