import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './listRoleMenuSettingCrud';
import { callTypes, listRoleSlice } from './listRoleMenuSlice';

const { actions } = listRoleSlice;
export const fetchsListRoleSettings = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		GroupID: 1,
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
		GroupID: userGroup || 1,
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

export const createdListUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: '0',
		UserName: values.userName,
		FirstName: values.firstName,
		LastName: values.lastMiddleName,
		CellPhone: values.cellPhone,
		Email: values.email,
		GroupID: values.userGroup,
		BizLine: values.bizLine.length > 0 ? values.bizLine.toString() : null,
		Region: values.region.length > 0 ? values.region.toString() : null,
		SlpCode: values.salesEmployee || -1,
		EmpCode: values.empSAP,
		LineManager: values.lineManager || -1,
		Inactive: values.inactive,
		Ischange: values.ischangePasswrod,
		Lang: 'vi',
		Legal: values.company.length > 0 ? values.company.toString() : null
	};
	return requestFrom
		.createdListUser(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdListUser({ dataRes }));
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

export const setTaskEditListUser = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchListUser({ value }));
};

export const updatedListUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: values.userID,
		UserName: values.userName,
		FirstName: values.firstName,
		LastName: values.lastMiddleName,
		CellPhone: values.cellPhone,
		Email: values.email,
		GroupID: values.userGroup,
		BizLine: values.bizLine.length > 0 ? values.bizLine.toString() : null,
		Region: values.region.length > 0 ? values.region.toString() : null,
		SlpCode: values.salesEmployee || -1,
		EmpCode: values.empSAP,
		LineManager: values.lineManager || -1,
		Inactive: values.inactive,
		Ischange: values.ischangePasswrod,
		Lang: 'vi',
		Legal: values.company.length > 0 ? values.company.toString() : null
	};
	return requestFrom
		.createdListUser(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedListUser({ dataRes }));
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
export const deletedListUser = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: item.userID
	};
	return requestFrom
		.deletedListUser(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deletedListUser({ dataReq }));
				notificationConfig('success', 'Thành công', 'Xoá người dùng thành công');
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', `${data.errorMessage}`);
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', `Serrver error`);
		});
};

// export const updatedAccessRole = item => dispatch => {
// 	dispatch(actions.startCall({ callType: callTypes.action }));

// };
