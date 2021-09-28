import request from 'app/store/setupAxios';

const API = 'api/TransBooking';

export const fetchsBooking = params => {
	return request(`${API}/GetList`, { params });
};

export const bookingModify = data => {
	return request({
		method: 'PUT',
		data,
		url: `${API}/Modify`
	});
};

export const removeBooking = params => {
	return request(`${API}/Remove`, { params });
};
