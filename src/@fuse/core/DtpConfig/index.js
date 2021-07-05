/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { notification } from 'antd';
import Cookies from 'js-cookie';
import * as moment from 'moment';
// notification

export const checkDeadline = time => {
	const deadline = moment().diff(time, 'days');
	return deadline;
};

export const badgeStatusGobal = {
	1: '#1890ff',
	2: '#560bad',
	3: '#e85d04',
	4: '#faad14',
	5: '#d9d9d9',
	6: '#52c41a',
	7: '#ff4d4f'
};
export const notificationConfig = (type, mess, descr) => {
	notification[type]({
		message: mess,
		description: descr
	});
};
export const URL = `http://api.dtp-education.com`;
export const sliceString = string => {
	return string.slice(0, 1);
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
export const checkFile = url => {
	const file = url.split('.').pop();
	return file;
};
export const nameFile = url => {
	const file = url.split('_').pop();
	return file;
};
export const validateField = 'Nội dung bắt buộc không được để trống.';
export const validateFieldEN = 'Please fill in the field.';
export function findIndexMultiple(id, newData, arr) {
	arr.forEach((d, i) => {
		if (d.menuID === id) {
			Object.keys(newData).forEach(key => {
				arr[i][key] = newData[key];
			});
			console.log(arr[i]);
			// return true;

			if (!arr[i].isWrite && !arr[i].isRead) {
				arr[i].isAccess = false;
			} else {
				arr[i].isAccess = true;
			}
		}
		if (d.lstPermissionItem.length) {
			findIndexMultiple(id, newData, d.lstPermissionItem);
		}
	});
	return arr;
}

export function findIndexMultipleAsset(id, newData, arr, itemChange) {
	arr.forEach((d, i) => {
		if (d.menuID === id) {
			Object.keys(newData).forEach(key => {
				arr[i][key] = newData[key];
				if (arr[i].lstPermissionItem.length) {
					const newArr = arr[i].lstPermissionItem.map(item =>
						arr[i].isAccess
							? { ...item, isAccess: true, isWrite: true, isRead: true }
							: { ...item, isAccess: false, isWrite: false, isRead: false }
					);
					arr[i].lstPermissionItem = newArr;
				}
			});
			if (!arr[i].isAccess) {
				arr[i].isWrite = false;
				arr[i].isRead = false;
				if (itemChange && itemChange.menuID === arr[i].parentID) {
					console.log('change ');
				}
			} else {
				arr[i].isWrite = true;
				arr[i].isRead = true;
				if (itemChange && itemChange.menuID === arr[i].parentID) {
					console.log('change ');
				}
			}
		}
		if (d.lstPermissionItem.length) {
			findIndexMultipleAsset(id, newData, d.lstPermissionItem, itemChange);
		}
	});
	return arr;
}
