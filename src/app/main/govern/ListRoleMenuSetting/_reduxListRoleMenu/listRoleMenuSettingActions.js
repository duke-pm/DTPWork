import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './listRoleMenuSettingCrud';
import { callTypes, listRoleSlice } from './listRoleMenuSlice';

const { actions } = listRoleSlice;
export const fetchsListRoleSettings = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		GroupID: 0,
		UserID: 0,
		IsWebOrMobile: 0
	};
	return requestFrom
		.fetchsListRoleSetting(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data.lstPermissionItem;
				dispatch(actions.fetchsListRoleMenu({ dataRes }));
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

export const fetchsListFilterRole = (userGroup, userID) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	console.log({ userGroup, userID });
	const paramsReq = {
		GroupID: userGroup || 0,
		UserID: userID || 0,
		IsWebOrMobile: 0
	};
	return requestFrom
		.fetchsListRoleSetting(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data.lstPermissionItem;
				dispatch(actions.fetchsListRoleMenu({ dataRes }));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const updatedRoleUser = (values, userID, groupID) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		groupID,
		userID: userID || 0,
		lstPermissionItem: values
	};
	return requestFrom
		.updateRoleSettings(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data.lstPermissionItem;
				dispatch(actions.updatedRoleSetting({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
