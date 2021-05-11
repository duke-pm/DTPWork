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
