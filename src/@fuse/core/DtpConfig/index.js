/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { notification } from 'antd';
import Cookies from 'js-cookie';
// notification

export const notificationConfig = (type, mess, descr) => {
	notification[type]({
		message: mess,
		description: descr
	});
};

export const getToken = () => {
	return Cookies.get('token') || null;
};
export const getRoleCookies = () => {
	return Cookies.get('role') || null;
};

export const refresh_token = () => {
	return Cookies.get('refresh_token') || null;
};
export const removeLocalStorage = () => {
	localStorage.removeItem('data_user');
};
export const removeCookies = () => {
	Cookies.remove('role');
	Cookies.remove('token');
	Cookies.remove('refresh_token');
};

export const getDataUserLocalStorage = () => {
	const data = JSON.parse(localStorage.getItem('data_user')) || null;
	return data;
};
export const getDataListMenu = () => {
	const data = JSON.parse(localStorage.getItem('listMenu')) || null;
	return data;
};

export const validateField = 'Nội dung bắt buộc không được để trống.';
export function findIndexMultiple(id, newData, arr) {
	arr.every((d, i) => {
		console.log(d);
		if (d.menuID === id) {
			Object.keys(newData).forEach(key => {
				arr[i][key] = newData[key];
				console.log(arr[i]);
			});
			return true;
		}
		if (d.lstPermissionItem.length) {
			findIndexMultiple(id, newData, d.lstPermissionItem);
		}
	});
}
