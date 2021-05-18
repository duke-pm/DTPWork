import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './groupUserCrud';
import { callTypes, groupUserSlice } from './groupUserSlice';

const { actions } = groupUserSlice;
export const fetchsGroupUser = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	return requestFrom
		.fetchsGroupUser(params)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.fetchsGroupUser(dataRes));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const createdGroupUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.createdGroupUser(values)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdGroupUser({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const setTaskEditGroupUser = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchGroupUser({ value }));
};

export const updatedGroupUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.updatedGroupUser(values)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdGroupUser({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
