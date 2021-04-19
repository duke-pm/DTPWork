import { notification } from 'antd';

// notification

export const notificationConfig = (type, mess, descr) => {
	notification[type]({
		message: mess,
		description: descr
	});
};
